import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export interface KRIItem {
  id: string;
  name: string;
  description: string;
  category: string;
  currentValue: number;
  thresholdGreen: number;
  thresholdAmber: number;
  thresholdRed: number;
  direction: string;
  unit: string | null;
  frequency: string;
  status: string;
  riskId: string | null;
  ownerId: string | null;
  lastUpdatedValue: string | null;
  risk?: { id: string; title: string; domain: string };
  owner?: { id: string; firstName: string; lastName: string };
  createdAt: string;
  updatedAt: string;
}

export interface KRISummary {
  total: number;
  green: number;
  amber: number;
  red: number;
}

export function useKRIs(filters?: { category?: string; status?: string; search?: string }) {
  return useQuery<KRIItem[]>({
    queryKey: ["kris", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.category) params.set("category", filters.category);
      if (filters?.status) params.set("status", filters.status);
      if (filters?.search) params.set("search", filters.search);
      const { data } = await axiosInstance.get(`/kris?${params}`);
      return data.data;
    },
  });
}

export function useKRISummary() {
  return useQuery<KRISummary>({
    queryKey: ["kris", "summary"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/kris/summary");
      return data.data;
    },
  });
}

export function useBreachedKRIs() {
  return useQuery<KRIItem[]>({
    queryKey: ["kris", "breached"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/kris/breached");
      return data.data;
    },
  });
}

export function useCreateKRI() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (kri: Partial<KRIItem>) => {
      const { data } = await axiosInstance.post("/kris", kri);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kris"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useUpdateKRI() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & Partial<KRIItem>) => {
      const { data } = await axiosInstance.put(`/kris/${id}`, updates);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kris"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useDeleteKRI() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/kris/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kris"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}
