import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import { RiskQuantification } from "../../domain/interfaces";

export function useRiskQuantifications(riskId: string) {
  return useQuery<RiskQuantification[]>({
    queryKey: ["risk-quantifications", riskId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/risks/${riskId}/quantifications`);
      return data.data;
    },
    enabled: !!riskId,
  });
}

export function useCreateRiskQuantification() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ riskId, ...quant }: { riskId: string } & Partial<RiskQuantification>) => {
      const { data } = await axiosInstance.post(`/risks/${riskId}/quantifications`, quant);
      return data.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["risk-quantifications", variables.riskId] });
      queryClient.invalidateQueries({ queryKey: ["risk-quantification-summary"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useUpdateRiskQuantification() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ riskId, id, ...updates }: { riskId: string; id: string } & Partial<RiskQuantification>) => {
      const { data } = await axiosInstance.put(`/risks/${riskId}/quantifications/${id}`, updates);
      return data.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["risk-quantifications", variables.riskId] });
      queryClient.invalidateQueries({ queryKey: ["risk-quantification-summary"] });
    },
  });
}

export function useDeleteRiskQuantification() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ riskId, id }: { riskId: string; id: string }) => {
      await axiosInstance.delete(`/risks/${riskId}/quantifications/${id}`);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["risk-quantifications", variables.riskId] });
      queryClient.invalidateQueries({ queryKey: ["risk-quantification-summary"] });
    },
  });
}

export function useExposureSummary() {
  return useQuery<{ totalALE: number; top5: any[]; byDomain: Record<string, number> }>({
    queryKey: ["risk-quantification-summary"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/risk-quantification/summary");
      return data.data;
    },
  });
}
