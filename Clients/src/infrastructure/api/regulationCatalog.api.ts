import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export interface RegulationDefinitionItem {
  id: string;
  code: string;
  name: string;
  version: string;
  type: "framework" | "regulation" | "standard";
  category: string;
  jurisdiction: string | null;
  description: string;
  issuer: string;
  effectiveDate: string | null;
  isActive: boolean;
}

export interface RegulationRequirementItem {
  id: string;
  regulationId: string;
  parentId: string | null;
  code: string;
  title: string;
  description: string;
  level: number;
  orderNo: number;
  category: string | null;
  keyQuestions: string[] | null;
  evidenceExamples: string[] | null;
  implementationGuidance: string | null;
  children?: RegulationRequirementItem[];
}

export interface CrossMappingItem {
  id: string;
  requirement: RegulationRequirementItem;
  regulation: { id: string; code: string; name: string };
  relevance: string;
  mappingType: string;
  notes: string | null;
  direction: "incoming" | "outgoing";
}

export interface OverlapResult {
  regulation1: { id: string; code: string; name: string; totalRequirements: number };
  regulation2: { id: string; code: string; name: string; totalRequirements: number };
  mappings: {
    source: { id: string; code: string; title: string };
    target: { id: string; code: string; title: string };
    relevance: string;
    mappingType: string;
    notes: string | null;
  }[];
  overlapPercentage: number;
  mappedCountReg1: number;
  mappedCountReg2: number;
}

export function useRegulations(filters?: {
  category?: string;
  type?: string;
  jurisdiction?: string;
  search?: string;
}) {
  return useQuery<RegulationDefinitionItem[]>({
    queryKey: ["regulations", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.category) params.set("category", filters.category);
      if (filters?.type) params.set("type", filters.type);
      if (filters?.jurisdiction) params.set("jurisdiction", filters.jurisdiction);
      if (filters?.search) params.set("search", filters.search);
      const { data } = await axiosInstance.get(`/regulations?${params}`);
      return data.data;
    },
  });
}

export function useRegulation(id: string | null) {
  return useQuery<{
    regulation: RegulationDefinitionItem;
    requirements: RegulationRequirementItem[];
  }>({
    queryKey: ["regulations", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/regulations/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
}

export function useRegulationRequirements(regulationId: string | null) {
  return useQuery<RegulationRequirementItem[]>({
    queryKey: ["regulations", regulationId, "requirements"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/regulations/${regulationId}/requirements`);
      return data.data;
    },
    enabled: !!regulationId,
  });
}

export function useRequirementDetail(regulationId: string | null, reqId: string | null) {
  return useQuery<{
    requirement: RegulationRequirementItem;
    crossMappings: CrossMappingItem[];
  }>({
    queryKey: ["regulations", regulationId, "requirements", reqId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/regulations/${regulationId}/requirements/${reqId}`);
      return data.data;
    },
    enabled: !!regulationId && !!reqId,
  });
}

export function useFrameworkOverlap(id1: string | null, id2: string | null) {
  return useQuery<OverlapResult>({
    queryKey: ["regulations", "overlap", id1, id2],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/regulations/overlap/${id1}/${id2}`);
      return data.data;
    },
    enabled: !!id1 && !!id2,
  });
}
