import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import type { Control } from "../../domain/interfaces";

interface ControlFilters {
  type?: string;
  effectiveness?: string;
  riskId?: string;
  search?: string;
}

export function useControls(filters?: ControlFilters) {
  return useQuery<Control[]>({
    queryKey: ["controls", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.type) params.set("type", filters.type);
      if (filters?.effectiveness) params.set("effectiveness", filters.effectiveness);
      if (filters?.riskId) params.set("riskId", filters.riskId);
      if (filters?.search) params.set("search", filters.search);
      const { data } = await axiosInstance.get(`/controls?${params}`);
      return data.data;
    },
  });
}

export function useControl(id: string | null) {
  return useQuery<Control>({
    queryKey: ["controls", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/controls/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
}

export function useCreateControl() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (control: { title: string; description?: string; type: string; effectiveness?: string; riskId?: string; ownerId?: string }) => {
      const { data } = await axiosInstance.post("/controls", control);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["controls"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useUpdateControl() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & Partial<Control>) => {
      const { data } = await axiosInstance.put(`/controls/${id}`, updates);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["controls"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useDeleteControl() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/controls/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["controls"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}
