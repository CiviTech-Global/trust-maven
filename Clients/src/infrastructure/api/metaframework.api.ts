import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export interface CommonControl {
  id: string;
  code: string;
  title: string;
  description: string;
  objective: string;
  domain: string;
  controlWeight: string;
  assessmentCriteria: string;
  evidenceRequestList: string[];
  implementationGuidance: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface StrMapping {
  id: string;
  commonControlId: string;
  requirementId: string;
  relationshipType: "subset_of" | "intersects_with" | "equal_to" | "superset_of" | "no_relationship";
  strength: number;
  rationale: string;
  requirement?: {
    id: string;
    code: string;
    title: string;
    description: string;
    regulationId: string;
    regulation?: {
      id: string;
      code: string;
      name: string;
    };
  };
  commonControl?: {
    id: string;
    code: string;
    title: string;
    domain: string;
  };
}

export interface ControlImplementation {
  id: string;
  organizationId: string;
  commonControlId: string;
  status: "not_started" | "draft" | "in_progress" | "awaiting_review" | "awaiting_approval" | "implemented" | "needs_rework" | "not_applicable";
  ownerId: string | null;
  reviewerId: string | null;
  approverId: string | null;
  implementationNotes: string | null;
  implementationDetails: string | null;
  evidenceIds: string[] | null;
  dueDate: string | null;
  completedAt: string | null;
  commonControl?: CommonControl;
}

export interface ImplementationsResponse {
  implementations: ControlImplementation[];
  summary: {
    total: number;
    implemented: number;
    inProgress: number;
    notStarted: number;
    compliancePercent: number;
  };
}

export interface JumpstartCoverageItem {
  requirementId: string;
  requirementCode: string;
  requirementTitle: string;
}

export interface JumpstartCoverage {
  totalRequirements: number;
  coveredCount: number;
  uncoveredCount: number;
  coveragePercent: number;
  covered: JumpstartCoverageItem[];
  uncovered: JumpstartCoverageItem[];
}

export interface RegulationCompliance {
  regulationId: string;
  regulationCode: string;
  regulationName: string;
  totalRequirements: number;
  implementedViaCommonControls: number;
  directImplementations: number;
  compliancePercent: number;
}

export interface UnifiedCompliance {
  regulations: RegulationCompliance[];
  overallCompliancePercent: number;
}

export function useCommonControls(filters?: { domain?: string; search?: string; weight?: string }) {
  return useQuery<CommonControl[]>({
    queryKey: ["metaframework", "controls", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.domain) params.set("domain", filters.domain);
      if (filters?.search) params.set("search", filters.search);
      if (filters?.weight) params.set("weight", filters.weight);
      const { data } = await axiosInstance.get(`/metaframework/controls?${params}`);
      return data;
    },
  });
}

export function useCommonControl(id: string | null) {
  return useQuery<CommonControl>({
    queryKey: ["metaframework", "controls", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/metaframework/controls/${id}`);
      return data;
    },
    enabled: !!id,
  });
}

export function useDomains() {
  return useQuery<string[]>({
    queryKey: ["metaframework", "domains"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/metaframework/controls/domains");
      return data;
    },
    staleTime: 1000 * 60 * 30,
  });
}

export function useMappingsForControl(controlId: string | null) {
  return useQuery<StrMapping[]>({
    queryKey: ["metaframework", "mappings", "by-control", controlId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/metaframework/mappings/by-control/${controlId}`);
      return data;
    },
    enabled: !!controlId,
  });
}

export function useMappingsForRequirement(requirementId: string | null) {
  return useQuery<StrMapping[]>({
    queryKey: ["metaframework", "mappings", "by-requirement", requirementId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/metaframework/mappings/by-requirement/${requirementId}`);
      return data;
    },
    enabled: !!requirementId,
  });
}

export function useImplementations(filters?: { status?: string; domain?: string }) {
  return useQuery<ImplementationsResponse>({
    queryKey: ["metaframework", "implementations", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.status) params.set("status", filters.status);
      if (filters?.domain) params.set("domain", filters.domain);
      const { data } = await axiosInstance.get(`/metaframework/implementations?${params}`);
      return data;
    },
  });
}

export function useUpdateImplementation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ controlId, ...body }: { controlId: string; status?: string; implementationNotes?: string; evidenceIds?: string[]; dueDate?: string | null }) => {
      const { data } = await axiosInstance.put(`/metaframework/implementations/${controlId}`, body);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["metaframework", "implementations"] });
    },
  });
}

export function useJumpstartCoverage(regulationId: string | null) {
  return useQuery<JumpstartCoverage>({
    queryKey: ["metaframework", "jumpstart", regulationId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/metaframework/jumpstart/${regulationId}`);
      return data;
    },
    enabled: !!regulationId,
  });
}

export function useUnifiedCompliance() {
  return useQuery<UnifiedCompliance>({
    queryKey: ["metaframework", "unified-compliance"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/metaframework/unified-compliance");
      return data;
    },
  });
}
