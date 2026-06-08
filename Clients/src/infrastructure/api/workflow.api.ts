import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import type { WorkflowDefinition } from "../../domain/interfaces/workflow";

export function useWorkflows(entityType?: string) {
  return useQuery<WorkflowDefinition[]>({
    queryKey: ["workflows", entityType],
    queryFn: async () => {
      const params = entityType ? `?entityType=${entityType}` : "";
      const { data } = await axiosInstance.get(`/workflows${params}`);
      return data.data;
    },
  });
}

export function useWorkflow(id: string | null) {
  return useQuery<WorkflowDefinition>({
    queryKey: ["workflows", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/workflows/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
}

export function useDefaultWorkflow(entityType: string | null) {
  return useQuery<WorkflowDefinition | null>({
    queryKey: ["workflows", "default", entityType],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/workflows/default/${entityType}`);
      return data.data;
    },
    enabled: !!entityType,
  });
}

export function useCreateWorkflow() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (wf: Partial<WorkflowDefinition>) => {
      const { data } = await axiosInstance.post("/workflows", wf);
      return data.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["workflows"] });
    },
  });
}

export function useUpdateWorkflow() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & Partial<WorkflowDefinition>) => {
      const { data } = await axiosInstance.put(`/workflows/${id}`, updates);
      return data.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["workflows"] });
    },
  });
}

export function useDeleteWorkflow() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/workflows/${id}`);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["workflows"] });
    },
  });
}

export function useCloneWorkflow() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, name }: { id: string; name: string }) => {
      const { data } = await axiosInstance.post(`/workflows/${id}/clone`, { name });
      return data.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["workflows"] });
    },
  });
}

export function useSetDefaultWorkflow() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.post(`/workflows/${id}/set-default`);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["workflows"] });
    },
  });
}

export function useExportWorkflow(id: string | null) {
  return useQuery({
    queryKey: ["workflows", "export", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/workflows/${id}/export`);
      return data.data;
    },
    enabled: !!id,
  });
}

export function useImportWorkflow() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (json: Record<string, unknown>) => {
      const { data } = await axiosInstance.post("/workflows/import", json);
      return data.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["workflows"] });
    },
  });
}

export function useValidateWorkflow() {
  return useMutation({
    mutationFn: async (def: { states: any[]; transitions: any[] }) => {
      const { data } = await axiosInstance.post("/workflows/validate", def);
      return data.data;
    },
  });
}

export function useGetTransitions(workflowId: string | null, currentState: string | null) {
  return useQuery({
    queryKey: ["workflows", "transitions", workflowId, currentState],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/workflows/${workflowId}/transitions?currentState=${currentState}`);
      return data.data;
    },
    enabled: !!workflowId && !!currentState,
  });
}

export function useExecuteTransition() {
  return useMutation({
    mutationFn: async (params: {
      workflowId: string;
      entityType: string;
      entityId: string;
      fromState: string;
      toState: string;
      comment?: string;
    }) => {
      const { workflowId, ...body } = params;
      const { data } = await axiosInstance.post(`/workflows/${workflowId}/execute`, body);
      return data.data;
    },
  });
}

export function useExecutionHistory(workflowId: string | null, entityId?: string) {
  return useQuery({
    queryKey: ["workflows", "history", workflowId, entityId],
    queryFn: async () => {
      const params = entityId ? `?entityId=${entityId}` : "";
      const { data } = await axiosInstance.get(`/workflows/${workflowId}/history${params}`);
      return data.data;
    },
    enabled: !!workflowId,
  });
}
