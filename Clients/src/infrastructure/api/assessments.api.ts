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
    mutationFn: async ({ riskId, ...assessment }: { riskId: string; likelihood: number; impact: number; methodology?: string; notes?: string; assessmentType?: string }) => {
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

export function useUpdateAssessment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ riskId, assessmentId, ...updates }: { riskId: string; assessmentId: string; likelihood?: number; impact?: number; methodology?: string; notes?: string }) => {
      const { data } = await axiosInstance.put(`/risks/${riskId}/assessments/${assessmentId}`, updates);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assessments"] });
      queryClient.invalidateQueries({ queryKey: ["risks"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useDeleteAssessment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ riskId, assessmentId }: { riskId: string; assessmentId: string }) => {
      await axiosInstance.delete(`/risks/${riskId}/assessments/${assessmentId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assessments"] });
      queryClient.invalidateQueries({ queryKey: ["risks"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useApproveAssessment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ riskId, assessmentId }: { riskId: string; assessmentId: string }) => {
      const { data } = await axiosInstance.put(`/risks/${riskId}/assessments/${assessmentId}/approve`);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assessments"] });
      queryClient.invalidateQueries({ queryKey: ["risks"] });
    },
  });
}

export function useRejectAssessment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ riskId, assessmentId }: { riskId: string; assessmentId: string }) => {
      const { data } = await axiosInstance.put(`/risks/${riskId}/assessments/${assessmentId}/reject`);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assessments"] });
      queryClient.invalidateQueries({ queryKey: ["risks"] });
    },
  });
}
