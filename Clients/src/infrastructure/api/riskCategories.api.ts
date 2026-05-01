import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import { RiskCategory } from "../../domain/interfaces";

export function useRiskCategories() {
  return useQuery<RiskCategory[]>({
    queryKey: ["risk-categories"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/risk-categories");
      return data.data;
    },
  });
}

export function useRiskCategoryTree() {
  return useQuery<RiskCategory[]>({
    queryKey: ["risk-categories", "tree"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/risk-categories/tree");
      return data.data;
    },
  });
}

export function useCreateRiskCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (category: Partial<RiskCategory>) => {
      const { data } = await axiosInstance.post("/risk-categories", category);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["risk-categories"] });
    },
  });
}

export function useUpdateRiskCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & Partial<RiskCategory>) => {
      const { data } = await axiosInstance.put(`/risk-categories/${id}`, updates);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["risk-categories"] });
    },
  });
}

export function useDeleteRiskCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/risk-categories/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["risk-categories"] });
    },
  });
}

export function useSeedDefaultCategories() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { data } = await axiosInstance.post("/risk-categories/seed-defaults");
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["risk-categories"] });
    },
  });
}
