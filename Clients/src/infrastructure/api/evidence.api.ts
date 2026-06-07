import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export interface EvidenceItem {
  id: string;
  title: string;
  entityType: string;
  entityId: string;
  description: string | null;
  filePath: string | null;
  fileType: string | null;
  status: string;
  notes: string | null;
  uploadedById: string;
  uploadedBy?: { id: string; firstName: string; lastName: string; email: string };
  createdAt: string;
  updatedAt: string;
}

export function useEvidence(filters?: { entityType?: string; entityId?: string; status?: string; search?: string }) {
  return useQuery<EvidenceItem[]>({
    queryKey: ["evidence", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.entityType) params.set("entityType", filters.entityType);
      if (filters?.entityId) params.set("entityId", filters.entityId);
      if (filters?.status) params.set("status", filters.status);
      if (filters?.search) params.set("search", filters.search);
      const { data } = await axiosInstance.get(`/evidence?${params}`);
      return data.data;
    },
  });
}

export function useEvidenceSummary() {
  return useQuery({
    queryKey: ["evidence", "summary"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/evidence/summary");
      return data.data;
    },
  });
}

export function useCreateEvidence() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: any) => {
      const { data } = await axiosInstance.post("/evidence", payload);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["evidence"] });
    },
  });
}

export function useUpdateEvidence() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & any) => {
      const { data } = await axiosInstance.put(`/evidence/${id}`, updates);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["evidence"] });
    },
  });
}

export function useDeleteEvidence() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/evidence/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["evidence"] });
    },
  });
}
