import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import type { RiskControlMapping } from "../../domain/interfaces";

export function useRiskControlMappings(riskId: string | null) {
  return useQuery<RiskControlMapping[]>({
    queryKey: ["riskControlMappings", riskId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/risks/${riskId}/controls`);
      return data.data;
    },
    enabled: !!riskId,
  });
}

export function useAddRiskControlMapping() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ riskId, controlId }: { riskId: string; controlId: string }) => {
      const { data } = await axiosInstance.post(`/risks/${riskId}/controls/${controlId}`);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["riskControlMappings"] });
      queryClient.invalidateQueries({ queryKey: ["risks"] });
      queryClient.invalidateQueries({ queryKey: ["controls"] });
    },
  });
}

export function useRemoveRiskControlMapping() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ riskId, controlId }: { riskId: string; controlId: string }) => {
      await axiosInstance.delete(`/risks/${riskId}/controls/${controlId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["riskControlMappings"] });
      queryClient.invalidateQueries({ queryKey: ["risks"] });
      queryClient.invalidateQueries({ queryKey: ["controls"] });
    },
  });
}
