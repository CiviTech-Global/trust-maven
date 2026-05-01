import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import type { ControlFrameworkMapping } from "../../domain/interfaces";

export function useControlFrameworkMappings(controlId: string | null) {
  return useQuery<ControlFrameworkMapping[]>({
    queryKey: ["controlFrameworkMappings", controlId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/controls/${controlId}/frameworks`);
      return data.data;
    },
    enabled: !!controlId,
  });
}

export function useAddControlFrameworkMapping() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (mapping: { controlId: string; frameworkId: string; requirementId: string }) => {
      const { data } = await axiosInstance.post(`/controls/${mapping.controlId}/frameworks`, {
        frameworkId: mapping.frameworkId,
        requirementId: mapping.requirementId,
      });
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["controlFrameworkMappings"] });
      queryClient.invalidateQueries({ queryKey: ["controls"] });
    },
  });
}

export function useRemoveControlFrameworkMapping() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ controlId, mappingId }: { controlId: string; mappingId: string }) => {
      await axiosInstance.delete(`/controls/${controlId}/frameworks/${mappingId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["controlFrameworkMappings"] });
      queryClient.invalidateQueries({ queryKey: ["controls"] });
    },
  });
}
