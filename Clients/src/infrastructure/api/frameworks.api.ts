import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export interface FrameworkItem {
  id: string;
  name: string;
  version: string;
  description: string;
  requirements: { id: string; title: string; description?: string }[];
  createdAt: string;
  updatedAt: string;
}

export interface ComplianceSummary {
  id: string;
  name: string;
  version: string;
  totalRequirements: number;
  coveredCount: number;
  coveragePercent: number;
}

export interface ComplianceCoverage {
  framework: { id: string; name: string; version: string };
  totalRequirements: number;
  coveredCount: number;
  coveragePercent: number;
  gaps: { id: string; title: string; description?: string }[];
  requirementDetails: {
    id: string;
    title: string;
    description?: string;
    covered: boolean;
    controls: { id: string; title: string; type: string; effectiveness: string }[];
  }[];
}

export function useFrameworks(filters?: { search?: string }) {
  return useQuery<FrameworkItem[]>({
    queryKey: ["frameworks", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.search) params.set("search", filters.search);
      const { data } = await axiosInstance.get(`/frameworks?${params}`);
      return data.data;
    },
  });
}

export function useFramework(id: string | null) {
  return useQuery<FrameworkItem>({
    queryKey: ["frameworks", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/frameworks/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
}

export function useCreateFramework() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (framework: Partial<FrameworkItem>) => {
      const { data } = await axiosInstance.post("/frameworks", framework);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["frameworks"] });
    },
  });
}

export function useUpdateFramework() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & Partial<FrameworkItem>) => {
      const { data } = await axiosInstance.put(`/frameworks/${id}`, updates);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["frameworks"] });
    },
  });
}

export function useDeleteFramework() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/frameworks/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["frameworks"] });
    },
  });
}

export function useComplianceSummary() {
  return useQuery<ComplianceSummary[]>({
    queryKey: ["frameworks", "compliance-summary"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/frameworks/compliance-summary");
      return data.data;
    },
  });
}

export function useComplianceCoverage(frameworkId: string | null) {
  return useQuery<ComplianceCoverage>({
    queryKey: ["frameworks", frameworkId, "compliance"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/frameworks/${frameworkId}/compliance`);
      return data.data;
    },
    enabled: !!frameworkId,
  });
}
