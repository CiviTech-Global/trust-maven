import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import type { Risk } from "../../domain/interfaces";

interface RiskFilters {
  domain?: string;
  status?: string;
  projectId?: string;
  search?: string;
}

export function useRisks(filters?: RiskFilters) {
  return useQuery<Risk[]>({
    queryKey: ["risks", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.domain) params.set("domain", filters.domain);
      if (filters?.status) params.set("status", filters.status);
      if (filters?.projectId) params.set("projectId", filters.projectId);
      if (filters?.search) params.set("search", filters.search);
      const { data } = await axiosInstance.get(`/risks?${params}`);
      return data.data;
    },
  });
}

export function useRisk(id: string | null) {
  return useQuery<Risk>({
    queryKey: ["risks", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/risks/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
}

export function useCreateRisk() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (risk: { title: string; description?: string; domain: string; projectId?: string }) => {
      const { data } = await axiosInstance.post("/risks", risk);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["risks"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useUpdateRisk() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & Partial<Risk>) => {
      const { data } = await axiosInstance.put(`/risks/${id}`, updates);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["risks"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useDeleteRisk() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/risks/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["risks"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}
