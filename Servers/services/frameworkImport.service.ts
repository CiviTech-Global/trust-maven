import { RegulationDefinition } from "../domain.layer/models/regulationDefinition/regulationDefinition.model";
import { RegulationRequirement } from "../domain.layer/models/regulationRequirement/regulationRequirement.model";
import { RegulationSeed, RequirementSeed } from "../structures/regulations";
import { logger } from "../utils/logger";

/**
 * Service for importing frameworks from external formats (OSCAL, CSV, SCF).
 * Each import method converts the external format to a RegulationSeed,
 * which can then be saved to the database.
 */
export class FrameworkImportService {
  /**
   * Import from a NIST OSCAL JSON catalog.
   * Expects an OSCAL catalog JSON object conforming to the NIST OSCAL 1.1 schema.
   */
  public async importFromOscal(oscalJson: any): Promise<RegulationSeed> {
    const catalog = oscalJson["oscal:catalog"] || oscalJson;
    const metadata = catalog.metadata || {};
    const controls = catalog.groups || catalog.controls || [];

    const seed: RegulationSeed = {
      code: this.toCode(metadata.title || "OSCAL_IMPORT"),
      name: metadata.title || "Imported OSCAL Framework",
      type: "framework",
      category: "information_security",
      jurisdiction: "US",
      issuer: metadata.publisher || "NIST",
      version: metadata.version || "1.0",
      description: metadata.description || "",
      effectiveDate: metadata["last-modified"] || undefined,
      metadata: {
        oscalVersion: catalog["oscal-version"],
        source: "OSCAL_IMPORT",
      },
      requirements: [],
    };

    if (controls.length > 0) {
      seed.requirements = this.parseOscalControls(controls);
    }

    return seed;
  }

  /**
   * Import from a CSV string with columns: code, title, description, parent_code, level, keyQuestions, evidenceExamples
   */
  public async importFromCsv(
    csvContent: string,
    frameworkMeta: {
      code: string;
      name: string;
      type: "framework" | "regulation" | "standard";
      category: string;
      jurisdiction: string;
      issuer: string;
    }
  ): Promise<RegulationSeed> {
    const lines = csvContent.trim().split("\n");
    const headers = lines[0].split(",").map((h) => h.trim());

    const seed: RegulationSeed = {
      code: frameworkMeta.code,
      name: frameworkMeta.name,
      type: frameworkMeta.type,
      category: frameworkMeta.category,
      jurisdiction: frameworkMeta.jurisdiction,
      issuer: frameworkMeta.issuer,
      version: "1.0",
      description: `Imported from CSV for ${frameworkMeta.name}`,
      requirements: [],
    };

    const rows = lines.slice(1).map((line) => this.parseCsvLine(line));
    const reqMap = new Map<string, RequirementSeed>();
    const childRelations: Array<{ childCode: string; parentCode: string }> = [];

    for (const row of rows) {
      const code = this.getColumn(row, headers, "code");
      if (!code) continue;

      const req: RequirementSeed = {
        code,
        title: this.getColumn(row, headers, "title") || code,
        level: parseInt(this.getColumn(row, headers, "level") || "1", 10) || 1,
        orderNo: 1,
        description: this.getColumn(row, headers, "description") || undefined,
        keyQuestions: this.parseListColumn(this.getColumn(row, headers, "keyQuestions")),
        evidenceExamples: this.parseListColumn(this.getColumn(row, headers, "evidenceExamples")),
        children: [],
      };

      reqMap.set(code, req);

      const parentCode = this.getColumn(row, headers, "parent_code");
      if (parentCode) {
        childRelations.push({ childCode: code, parentCode });
      }
    }

    // Build hierarchy
    const rootReqs: RequirementSeed[] = [];
    const addedToParent = new Set<string>();

    for (const { childCode, parentCode } of childRelations) {
      const child = reqMap.get(childCode);
      const parent = reqMap.get(parentCode);
      if (child && parent) {
        if (!parent.children) parent.children = [];
        parent.children.push(child);
        addedToParent.add(childCode);
      }
    }

    // Any requirement not added as a child becomes a root
    for (const [code, req] of reqMap) {
      if (!addedToParent.has(code)) {
        rootReqs.push(req);
      }
    }

    // Sort and set orderNo
    const assignOrder = (reqs: RequirementSeed[], startOrder: number = 1): number => {
      let order = startOrder;
      for (const req of reqs) {
        req.orderNo = order++;
        if (req.children && req.children.length > 0) {
          assignOrder(req.children, 1);
        }
      }
      return order;
    };
    assignOrder(rootReqs);

    seed.requirements = rootReqs;
    return seed;
  }

  /**
   * Import from SCF (Secure Controls Framework) JSON export.
   * Expects SCF JSON format with controls array containing control details.
   */
  public async importFromScf(scfJson: any): Promise<RegulationSeed> {
    const scf = scfJson;
    const controls: any[] = scf.controls || scf.controlGroups || [];

    const seed: RegulationSeed = {
      code: "SCF_IMPORT",
      name: scf.name || "SCF Imported Framework",
      type: "framework",
      category: "information_security",
      jurisdiction: "Global",
      issuer: scf.author || "SCF",
      version: scf.version || "1.0",
      description: scf.description || "",
      requirements: [],
    };

    if (controls.length > 0) {
      seed.requirements = this.parseScfControls(controls);
    }

    return seed;
  }

  /**
   * Save an imported RegulationSeed to the database.
   */
  public async saveImportedFramework(seed: RegulationSeed): Promise<void> {
    const existing = await RegulationDefinition.findOne({ where: { code: seed.code } });
    if (existing) {
      logger.warn(`Framework ${seed.code} already exists, skipping import`);
      return;
    }

    const regulation = await RegulationDefinition.create({
      code: seed.code,
      name: seed.name,
      type: seed.type,
      category: seed.category,
      jurisdiction: seed.jurisdiction,
      issuer: seed.issuer,
      version: seed.version,
      description: seed.description,
      effectiveDate: seed.effectiveDate || null,
      metadata: { ...(seed.metadata || {}), imported: true },
      isActive: true,
    });

    await this.saveRequirements(regulation.id, seed.requirements, null);
    logger.info(`Imported framework saved: ${seed.name} (${seed.code})`);
  }

  // ─── Private Helpers ──────────────────────────────────────────

  private toCode(title: string): string {
    return title
      .toUpperCase()
      .replace(/[^A-Z0-9]+/g, "_")
      .replace(/^_|_$/g, "")
      .substring(0, 50);
  }

  private parseOscalControls(controls: any[]): RequirementSeed[] {
    return controls.map((ctrl, idx) => this.parseOscalControl(ctrl, idx + 1));
  }

  private parseOscalControl(ctrl: any, orderNo: number): RequirementSeed {
    const req: RequirementSeed = {
      code: ctrl.id || ctrl["control-id"] || `CTRL-${orderNo}`,
      title: ctrl.title || "",
      level: (ctrl.id || "").split(".").length - 1 || 0,
      orderNo,
      description: ctrl.prose || ctrl.description || undefined,
      keyQuestions: [],
      evidenceExamples: [],
    };

    if (ctrl.parts) {
      for (const part of ctrl.parts) {
        if (part.name === "guidance") {
          req.implementationGuidance = part.prose || part.text;
        }
      }
    }

    if (ctrl.controls || ctrl.subcontrols) {
      const subs = ctrl.controls || ctrl.subcontrols;
      req.children = subs.map((sub: any, i: number) =>
        this.parseOscalControl(sub, i + 1)
      );
    }

    return req;
  }

  private parseScfControls(controls: any[]): RequirementSeed[] {
    return controls.map((ctrl, idx) => {
      const req: RequirementSeed = {
        code: ctrl.code || ctrl.id || `SCF-${idx + 1}`,
        title: ctrl.name || ctrl.title || "",
        level: ctrl.level || 0,
        orderNo: idx + 1,
        description: ctrl.description || ctrl.guidance || undefined,
        category: ctrl.domain || ctrl.family || undefined,
        keyQuestions: ctrl.keyQuestions || ctrl.assessmentQuestions || [],
        evidenceExamples: ctrl.evidenceExamples || ctrl.artifacts || [],
        implementationGuidance: ctrl.implementationGuidance || undefined,
      };

      if (ctrl.subControls || ctrl.children) {
        req.children = this.parseScfControls(ctrl.subControls || ctrl.children);
      }

      return req;
    });
  }

  private async saveRequirements(
    regulationId: string,
    requirements: RequirementSeed[],
    parentId: string | null
  ): Promise<void> {
    for (const req of requirements) {
      const record = await RegulationRequirement.create({
        regulationId,
        parentId,
        code: req.code,
        title: req.title,
        description: req.description || "",
        level: req.level,
        orderNo: req.orderNo,
        category: req.category || null,
        keyQuestions: req.keyQuestions || null,
        evidenceExamples: req.evidenceExamples || null,
        implementationGuidance: req.implementationGuidance || null,
        isActive: true,
      });

      if (req.children && req.children.length > 0) {
        await this.saveRequirements(regulationId, req.children, record.id);
      }
    }
  }

  private parseCsvLine(line: string): string[] {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === "," && !inQuotes) {
        result.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  }

  private getColumn(row: string[], headers: string[], colName: string): string {
    const idx = headers.indexOf(colName);
    return idx >= 0 && idx < row.length ? row[idx] : "";
  }

  private parseListColumn(value: string): string[] | undefined {
    if (!value) return undefined;
    return value
      .split("|")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  }
}

export const frameworkImportService = new FrameworkImportService();
