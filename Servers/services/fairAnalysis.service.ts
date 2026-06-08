import { FairAnalysis } from "../domain.layer/models/fairAnalysis/fairAnalysis.model";
import { auditService } from "./audit.service";
import { AuditAction } from "../types";

interface DistributionParams {
  min?: number;
  max?: number;
  mostLikely?: number;
  distribution?: string;
}

export class FairAnalysisService {
  async findByRisk(riskId: string, orgId: string) {
    return FairAnalysis.findAll({
      where: { riskId, organizationId: orgId, isActive: true },
      order: [["createdAt", "DESC"]],
    });
  }

  async findById(id: string, orgId: string) {
    const analysis = await FairAnalysis.findOne({ where: { id, organizationId: orgId } });
    if (!analysis) throw new Error("FairAnalysis not found");
    return analysis;
  }

  async create(data: {
    riskId: string;
    methodology?: string;
    lossEventFrequency?: Record<string, unknown>;
    lossMagnitude?: Record<string, unknown>;
    threatEventFrequency?: number;
    vulnerability?: number;
    lossMagnitudeMin?: number;
    lossMagnitudeMostLikely?: number;
    lossMagnitudeMax?: number;
    assumptions?: string;
    simulationRuns?: number;
  }, orgId: string, userId: string) {
    const analysis = await FairAnalysis.create({
      ...data,
      organizationId: orgId,
    });

    await auditService.log({
      organizationId: orgId,
      userId,
      entityType: "fair_analysis",
      entityId: analysis.id,
      action: AuditAction.CREATE,
      changes: data,
    });

    return analysis;
  }

  async update(id: string, data: Partial<{
    methodology: string;
    lossEventFrequency: Record<string, unknown>;
    lossMagnitude: Record<string, unknown>;
    threatEventFrequency: number;
    vulnerability: number;
    lossMagnitudeMin: number;
    lossMagnitudeMostLikely: number;
    lossMagnitudeMax: number;
    assumptions: string;
    simulationRuns: number;
    isActive: boolean;
  }>, orgId: string, userId: string) {
    const analysis = await FairAnalysis.findOne({ where: { id, organizationId: orgId } });
    if (!analysis) throw new Error("FairAnalysis not found");

    const changedFields: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) changedFields[key] = value;
    }

    await analysis.update(changedFields);

    await auditService.log({
      organizationId: orgId,
      userId,
      entityType: "fair_analysis",
      entityId: id,
      action: AuditAction.UPDATE,
      changes: changedFields,
    });

    return analysis;
  }

  async delete(id: string, orgId: string, userId: string) {
    const analysis = await FairAnalysis.findOne({ where: { id, organizationId: orgId } });
    if (!analysis) throw new Error("FairAnalysis not found");

    await analysis.destroy();

    await auditService.log({
      organizationId: orgId,
      userId,
      entityType: "fair_analysis",
      entityId: id,
      action: AuditAction.DELETE,
    });
  }

  async runMonteCarlo(analysisId: string, orgId: string) {
    const analysis = await this.findById(analysisId, orgId);

    const lef = analysis.lossEventFrequency as DistributionParams | null;
    const lm = analysis.lossMagnitude as DistributionParams | null;

    if (!lef || !lm) {
      throw new Error("Loss event frequency and loss magnitude parameters are required for simulation");
    }

    const runs = analysis.simulationRuns || 10000;
    const results: number[] = [];

    for (let i = 0; i < runs; i++) {
      const lefSample = this.sampleFromDistribution(lef);
      const lmSample = this.sampleFromDistribution(lm);
      const ale = lefSample * lmSample;
      results.push(ale);
    }

    results.sort((a, b) => a - b);

    const sum = results.reduce((a, b) => a + b, 0);
    const mean = sum / runs;
    const variance = results.reduce((acc, val) => acc + (val - mean) ** 2, 0) / runs;
    const stdDev = Math.sqrt(variance);

    const p5 = results[Math.floor(runs * 0.05)];
    const p50 = results[Math.floor(runs * 0.5)];
    const p95 = results[Math.floor(runs * 0.95)];

    const histogram = this.buildHistogram(results, 20);

    const simulationResults = {
      histogram,
      percentiles: { p5, p50, p95 },
      mean,
      stdDev,
      min: results[0],
      max: results[results.length - 1],
      totalRuns: runs,
      confidenceInterval: 0.95,
    };

    await analysis.update({
      annualLossExpectancy: mean,
      simulationResults: simulationResults as unknown as Record<string, unknown>,
      confidenceInterval: 95,
    });

    await auditService.log({
      organizationId: orgId,
      userId: "system",
      entityType: "fair_analysis",
      entityId: analysis.id,
      action: AuditAction.SIMULATE as any,
      changes: { simulationRuns: runs, annualLossExpectancy: mean },
    });

    return { ...simulationResults, annualLossExpectancy: mean };
  }

  private sampleFromDistribution(params: DistributionParams): number {
    const min = params.min || 0;
    const max = params.max || 100;
    const mostLikely = params.mostLikely || (min + max) / 2;
    const distribution = params.distribution || "triangular";

    const random = Math.random();

    switch (distribution) {
      case "uniform":
        return min + random * (max - min);

      case "lognormal": {
        const mu = Math.log(mostLikely);
        const sigma = Math.log(max / mostLikely) / 3;
        const normalRand = this.boxMuller(random, Math.random());
        return Math.max(min, Math.min(max, Math.exp(mu + sigma * normalRand)));
      }

      case "triangular":
      default: {
        const f = (mostLikely - min) / (max - min);
        if (random < f) {
          return min + Math.sqrt(random * (max - min) * (mostLikely - min));
        }
        return max - Math.sqrt((1 - random) * (max - min) * (max - mostLikely));
      }
    }
  }

  private boxMuller(u1: number, u2: number): number {
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  }

  private buildHistogram(results: number[], numBins: number): { binStart: number; binEnd: number; count: number }[] {
    const min = results[0];
    const max = results[results.length - 1];
    const binWidth = (max - min) / numBins || 1;

    const bins: { binStart: number; binEnd: number; count: number }[] = [];
    for (let i = 0; i < numBins; i++) {
      const binStart = min + i * binWidth;
      const binEnd = binStart + binWidth;
      bins.push({ binStart, binEnd, count: 0 });
    }

    for (const val of results) {
      const binIndex = Math.min(Math.floor((val - min) / binWidth), numBins - 1);
      bins[binIndex].count++;
    }

    return bins;
  }

  async getExposureSummary(orgId: string) {
    const analyses = await FairAnalysis.findAll({
      where: { organizationId: orgId, isActive: true },
    });

    const totalALE = analyses.reduce((sum, a) => sum + (Number(a.annualLossExpectancy) || 0), 0);

    return {
      totalAnnualLossExpectancy: totalALE,
      analysisCount: analyses.length,
      byMethodology: analyses.reduce((acc: Record<string, number>, a) => {
        acc[a.methodology] = (acc[a.methodology] || 0) + 1;
        return acc;
      }, {}),
      topExposures: analyses
        .filter((a) => a.annualLossExpectancy)
        .sort((a, b) => Number(b.annualLossExpectancy) - Number(a.annualLossExpectancy))
        .slice(0, 10)
        .map((a) => ({
          id: a.id,
          riskId: a.riskId,
          methodology: a.methodology,
          annualLossExpectancy: a.annualLossExpectancy,
        })),
    };
  }
}

export const fairAnalysisService = new FairAnalysisService();
