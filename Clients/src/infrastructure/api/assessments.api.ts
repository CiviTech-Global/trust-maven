import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import type { RiskAssessment } from "../../domain/interfaces";

export function useAssessments(riskId: string | null) {
  return useQuery<RiskAssessment[]>({
    queryKey: ["assessments", riskId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/risks/${riskId}/assessments`);
      return data.data;
    },
    enabled: !!riskId,
  });
}

export function useCreateAssessment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ riskId, ...assessment }: { riskId: string; likelihood: number; impact: number; methodology?: string; notes?: string }) => {
      const { data } = await axiosInstance.post(`/risks/${riskId}/assessments`, assessment);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assessments"] });
      queryClient.invalidateQueries({ queryKey: ["risks"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}
