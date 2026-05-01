import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import type { RiskTreatment } from "../../domain/interfaces";

export function useTreatments(riskId: string | null) {
  return useQuery<RiskTreatment[]>({
    queryKey: ["treatments", riskId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/risks/${riskId}/treatments`);
      return data.data;
    },
    enabled: !!riskId,
  });
}

export function useCreateTreatment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ riskId, ...treatment }: { riskId: string; strategy: string; description: string; responsibleId?: string; dueDate?: string }) => {
      const { data } = await axiosInstance.post(`/risks/${riskId}/treatments`, treatment);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["treatments"] });
      queryClient.invalidateQueries({ queryKey: ["risks"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useUpdateTreatment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ riskId, treatmentId, ...updates }: { riskId: string; treatmentId: string } & Partial<RiskTreatment>) => {
      const { data } = await axiosInstance.put(`/risks/${riskId}/treatments/${treatmentId}`, updates);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["treatments"] });
      queryClient.invalidateQueries({ queryKey: ["risks"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useApproveTreatment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ riskId, treatmentId }: { riskId: string; treatmentId: string }) => {
      const { data } = await axiosInstance.put(`/risks/${riskId}/treatments/${treatmentId}/approve`);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["treatments"] });
      queryClient.invalidateQueries({ queryKey: ["risks"] });
    },
  });
}

export function useRejectTreatment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ riskId, treatmentId }: { riskId: string; treatmentId: string }) => {
      const { data } = await axiosInstance.put(`/risks/${riskId}/treatments/${treatmentId}/reject`);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["treatments"] });
      queryClient.invalidateQueries({ queryKey: ["risks"] });
    },
  });
}
