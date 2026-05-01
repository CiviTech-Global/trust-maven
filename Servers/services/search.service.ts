/**
 * Global Search Service
 *
 * Provides unified cross-entity search using PostgreSQL ILIKE.
 * Returns results grouped by entity type with match highlighting.
 * Inspired by VerifyWise's "Wise Search" approach.
 */

import { Op } from "sequelize";
import { Risk } from "../domain.layer/models/risk/risk.model";
import { Control } from "../domain.layer/models/control/control.model";
import { Project } from "../domain.layer/models/project/project.model";
import { Vendor } from "../domain.layer/models/vendor/vendor.model";
import { KRI } from "../domain.layer/models/kri/kri.model";
import { Framework } from "../domain.layer/models/framework/framework.model";
import { Audit } from "../domain.layer/models/audit/audit.model";

export interface SearchResult {
  id: string;
  entityType: string;
  title: string;
  subtitle?: string;
  matchedField: string;
  route: string;
}

export interface GroupedSearchResults {
  [entityType: string]: {
    results: SearchResult[];
    count: number;
  };
}

interface EntitySearchConfig {
  model: any;
  entityType: string;
  searchFields: string[];
  titleField: string;
  subtitleField?: string;
  route: (id: string) => string;
}

const ENTITY_CONFIGS: EntitySearchConfig[] = [
  {
    model: Risk,
    entityType: "risks",
    searchFields: ["title", "description"],
    titleField: "title",
    subtitleField: "description",
    route: (id) => `/risks/${id}`,
  },
  {
    model: Control,
    entityType: "controls",
    searchFields: ["title", "description"],
    titleField: "title",
    subtitleField: "description",
    route: (id) => `/controls?highlight=${id}`,
  },
  {
    model: Project,
    entityType: "projects",
    searchFields: ["name", "description"],
    titleField: "name",
    subtitleField: "description",
    route: (id) => `/projects/${id}`,
  },
  {
    model: Vendor,
    entityType: "vendors",
    searchFields: ["name", "description"],
    titleField: "name",
    subtitleField: "description",
    route: (id) => `/vendors?highlight=${id}`,
  },
  {
    model: KRI,
    entityType: "kris",
    searchFields: ["name", "description"],
    titleField: "name",
    subtitleField: "description",
    route: (id) => `/kris?highlight=${id}`,
  },
  {
    model: Framework,
    entityType: "frameworks",
    searchFields: ["name", "description"],
    titleField: "name",
    subtitleField: "description",
    route: (id) => `/frameworks?highlight=${id}`,
  },
  {
    model: Audit,
    entityType: "audits",
    searchFields: ["title", "description", "scope"],
    titleField: "title",
    subtitleField: "description",
    route: (id) => `/audits/${id}`,
  },
];

const MIN_QUERY_LENGTH = 2;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;

export class SearchService {
  async search(
    query: string,
    organizationId: string,
    options: { limit?: number; offset?: number } = {},
  ): Promise<{ results: GroupedSearchResults; totalCount: number; query: string }> {
    if (query.trim().length < MIN_QUERY_LENGTH) {
      return { results: {}, totalCount: 0, query };
    }

    const limit = Math.min(Math.max(1, options.limit || DEFAULT_LIMIT), MAX_LIMIT);
    const searchPattern = `%${query.trim()}%`;
    const grouped: GroupedSearchResults = {};
    let totalCount = 0;

    await Promise.all(
      ENTITY_CONFIGS.map(async (config) => {
        const whereClause: any = {
          organizationId,
          [Op.or]: config.searchFields.map((field) => ({
            [field]: { [Op.iLike]: searchPattern },
          })),
        };

        const results = await config.model.findAll({
          where: whereClause,
          limit,
          attributes: ["id", ...new Set([config.titleField, config.subtitleField].filter(Boolean))],
          order: [["updatedAt", "DESC"]],
        });

        if (results.length > 0) {
          grouped[config.entityType] = {
            results: results.map((r: any) => {
              // Determine which field matched
              const matchedField = config.searchFields.find((f) =>
                (r[f] || "").toLowerCase().includes(query.trim().toLowerCase()),
              ) || config.searchFields[0];

              return {
                id: r.id,
                entityType: config.entityType,
                title: r[config.titleField] || "",
                subtitle: config.subtitleField ? r[config.subtitleField] || "" : undefined,
                matchedField,
                route: config.route(r.id),
              };
            }),
            count: results.length,
          };
          totalCount += results.length;
        }
      }),
    );

    return { results: grouped, totalCount, query };
  }
}

export const searchService = new SearchService();
