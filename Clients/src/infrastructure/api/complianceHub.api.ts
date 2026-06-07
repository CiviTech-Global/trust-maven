import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import { RegulationDefinitionItem } from "./regulationCatalog.api";

export interface AdoptedRegulation {
  id: string;
  organizationId: string;
  regulationId: string;
  adoptedAt: string;
  targetComplianceDate: string | null;
  status: string;
  notes: string | null;
  regulation: RegulationDefinitionItem;
}

export interface ComplianceDashboard {
  adoptedRegulations: {
    id: string;
    code: string;
    name: string;
    category: string;
    compliance: number;
    totalRequirements: number;
    implemented: number;
  }[];
  areaScores: { area: string; score: number }[];
  overallScore: number;
  topGaps: { requirement: string; regulation: string; code: string }[];
}

export interface ImplementationStatus {
  regulation: RegulationDefinitionItem;
  orgRegulation: AdoptedRegulation;
  summary: {
    totalRequirements: number;
    implemented: number;
    inProgress: number;
    notStarted: number;
    notApplicable: number;
    compliancePercent: number;
  };
  requirements: (any & { implementation: any | null })[];
}

export interface GapAnalysisResult {
  regulation: { id: string; code: string; name: string };
  totalRequirements: number;
  alreadyCovered: any[];
  leverageable: any[];
  newWork: any[];
  summary: {
    coveredCount: number;
    leverageableCount: number;
    newWorkCount: number;
    estimatedCoveragePercent: number;
  };
}

export interface FrameworkRecommendation {
  recommended: RegulationDefinitionItem[];
  reasoning: string[];
  coverageMatrix: { area: string; frameworks: string[] }[];
}

// ── Dashboard ───────────────────────────────────────────────────

export function useComplianceHubDashboard() {
  return useQuery<ComplianceDashboard>({
    queryKey: ["compliance-hub", "dashboard"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/compliance-hub/dashboard");
      return data.data;
    },
  });
}

export function useAreaCompliance(area: string | null) {
  return useQuery({
    queryKey: ["compliance-hub", "area", area],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/compliance-hub/area/${encodeURIComponent(area!)}`);
      return data.data;
    },
    enabled: !!area,
  });
}

export function useSmartGapAnalysis(regulationId: string | null) {
  return useQuery<GapAnalysisResult>({
    queryKey: ["compliance-hub", "gaps", regulationId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/compliance-hub/gaps/${regulationId}`);
      return data.data;
    },
    enabled: !!regulationId,
  });
}

export function useFrameworkTranslation(fromId: string | null, toId: string | null) {
  return useQuery({
    queryKey: ["compliance-hub", "translate", fromId, toId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/compliance-hub/translate/${fromId}/${toId}`);
      return data.data;
    },
    enabled: !!fromId && !!toId,
  });
}

export function useFrameworkRecommendation(orgProfile: {
  industry?: string;
  size?: string;
  jurisdictions?: string[];
} | null) {
  return useQuery<FrameworkRecommendation>({
    queryKey: ["compliance-hub", "recommend", orgProfile],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (orgProfile?.industry) params.set("industry", orgProfile.industry);
      if (orgProfile?.size) params.set("size", orgProfile.size);
      if (orgProfile?.jurisdictions) params.set("jurisdictions", orgProfile.jurisdictions.join(","));
      const { data } = await axiosInstance.get(`/compliance-hub/recommend?${params}`);
      return data.data;
    },
    enabled: !!orgProfile,
  });
}

// ── Adopted Regulations ─────────────────────────────────────────

export function useAdoptedRegulations() {
  return useQuery<AdoptedRegulation[]>({
    queryKey: ["org-regulations"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/org-regulations");
      return data.data;
    },
  });
}

export function useImplementationStatus(orgRegId: string | null) {
  return useQuery<ImplementationStatus>({
    queryKey: ["org-regulations", orgRegId, "status"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/org-regulations/${orgRegId}/status`);
      return data.data;
    },
    enabled: !!orgRegId,
  });
}

export function useAdoptRegulation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      regulationId: string;
      targetComplianceDate?: string;
      notes?: string;
    }) => {
      const { data } = await axiosInstance.post("/org-regulations", payload);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["org-regulations"] });
      queryClient.invalidateQueries({ queryKey: ["compliance-hub"] });
    },
  });
}

export function useDeprecateRegulation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (orgRegId: string) => {
      const { data } = await axiosInstance.delete(`/org-regulations/${orgRegId}`);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["org-regulations"] });
      queryClient.invalidateQueries({ queryKey: ["compliance-hub"] });
    },
  });
}

export function useBulkDeprecateRegulations() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (ids: string[]) => {
      const { data } = await axiosInstance.post("/org-regulations/bulk/deprecate", { ids });
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["org-regulations"] });
      queryClient.invalidateQueries({ queryKey: ["compliance-hub"] });
    },
  });
}

export function useBulkUpdateRegulationStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ ids, status }: { ids: string[]; status: string }) => {
      const { data } = await axiosInstance.post("/org-regulations/bulk/status", { ids, status });
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["org-regulations"] });
      queryClient.invalidateQueries({ queryKey: ["compliance-hub"] });
    },
  });
}

export function useUpdateRequirementImpl() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      implId,
      ...updates
    }: {
      implId: string;
      status?: string;
      ownerId?: string;
      reviewerId?: string;
      implementationNotes?: string;
      evidenceLinks?: string[];
      dueDate?: string;
      controlIds?: string[];
    }) => {
      const { data } = await axiosInstance.put(`/org-regulations/requirements/${implId}`, updates);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["org-regulations"] });
      queryClient.invalidateQueries({ queryKey: ["compliance-hub"] });
    },
  });
}
