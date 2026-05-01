import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export interface VendorItem {
  id: string;
  name: string;
  description: string;
  riskLevel: string;
  contactInfo: Record<string, unknown>;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface VendorAssessmentItem {
  id: string;
  vendorId: string;
  title: string;
  assessmentType: string;
  status: string;
  riskRating: string | null;
  score: number | null;
  questionnaire: { question: string; answer: string; score?: number; notes?: string }[];
  findings: { severity: string; description: string; recommendation: string }[];
  summary: string | null;
  assessedAt: string | null;
  nextReviewDate: string | null;
  assessor?: { id: string; firstName: string; lastName: string };
  createdAt: string;
}

export function useVendors(filters?: { riskLevel?: string; status?: string; search?: string }) {
  return useQuery<VendorItem[]>({
    queryKey: ["vendors", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.riskLevel) params.set("riskLevel", filters.riskLevel);
      if (filters?.status) params.set("status", filters.status);
      if (filters?.search) params.set("search", filters.search);
      const { data } = await axiosInstance.get(`/vendors?${params}`);
      return data.data;
    },
  });
}

export function useVendor(id: string | null) {
  return useQuery<VendorItem>({
    queryKey: ["vendors", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/vendors/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
}

export function useCreateVendor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (vendor: Partial<VendorItem>) => {
      const { data } = await axiosInstance.post("/vendors", vendor);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
    },
  });
}

export function useUpdateVendor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & Partial<VendorItem>) => {
      const { data } = await axiosInstance.put(`/vendors/${id}`, updates);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
    },
  });
}

export function useDeleteVendor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/vendors/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
    },
  });
}

export function useVendorAssessments(vendorId: string | null) {
  return useQuery<VendorAssessmentItem[]>({
    queryKey: ["vendorAssessments", vendorId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/vendors/${vendorId}/assessments`);
      return data.data;
    },
    enabled: !!vendorId,
  });
}

export function useCreateVendorAssessment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ vendorId, ...assessment }: { vendorId: string } & Partial<VendorAssessmentItem>) => {
      const { data } = await axiosInstance.post(`/vendors/${vendorId}/assessments`, assessment);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendorAssessments"] });
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
    },
  });
}
