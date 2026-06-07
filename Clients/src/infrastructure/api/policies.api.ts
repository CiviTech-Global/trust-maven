import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import type { Policy } from "../../domain/interfaces";

interface PolicyFilters {
  status?: string;
  search?: string;
}

export function usePolicies(filters?: PolicyFilters) {
  return useQuery<Policy[]>({
    queryKey: ["policies", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.status) params.set("status", filters.status);
      if (filters?.search) params.set("search", filters.search);
      const { data } = await axiosInstance.get(`/policies?${params}`);
      return data.data;
    },
  });
}

export function usePolicy(id: string | null) {
  return useQuery<Policy>({
    queryKey: ["policies", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/policies/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
}

export function useCreatePolicy() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (policy: { title: string; content?: string; version?: string; status?: string; ownerId?: string }) => {
      const { data } = await axiosInstance.post("/policies", policy);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["policies"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useUpdatePolicy() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & Partial<Policy>) => {
      const { data } = await axiosInstance.put(`/policies/${id}`, updates);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["policies"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useDeletePolicy() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/policies/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["policies"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}
