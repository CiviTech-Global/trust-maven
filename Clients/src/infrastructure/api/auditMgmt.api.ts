import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import { AuditRecord, AuditFinding } from "../../domain/interfaces";

export function useAudits(filters?: { status?: string; auditType?: string; search?: string }) {
  return useQuery<AuditRecord[]>({
    queryKey: ["audits", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.status) params.set("status", filters.status);
      if (filters?.auditType) params.set("auditType", filters.auditType);
      if (filters?.search) params.set("search", filters.search);
      const { data } = await axiosInstance.get(`/audits?${params}`);
      return data.data;
    },
  });
}

export function useAuditById(id: string) {
  return useQuery<AuditRecord>({
    queryKey: ["audits", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/audits/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
}

export function useCreateAudit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (audit: Partial<AuditRecord>) => {
      const { data } = await axiosInstance.post("/audits", audit);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["audits"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useUpdateAudit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & Partial<AuditRecord>) => {
      const { data } = await axiosInstance.put(`/audits/${id}`, updates);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["audits"] });
    },
  });
}

export function useDeleteAudit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/audits/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["audits"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useCreateFinding() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ auditId, ...finding }: { auditId: string } & Partial<AuditFinding>) => {
      const { data } = await axiosInstance.post(`/audits/${auditId}/findings`, finding);
      return data.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["audits", variables.auditId] });
      queryClient.invalidateQueries({ queryKey: ["audits"] });
    },
  });
}

export function useUpdateFinding() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ auditId, findingId, ...updates }: { auditId: string; findingId: string } & Partial<AuditFinding>) => {
      const { data } = await axiosInstance.put(`/audits/${auditId}/findings/${findingId}`, updates);
      return data.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["audits", variables.auditId] });
    },
  });
}

export function useDeleteFinding() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ auditId, findingId }: { auditId: string; findingId: string }) => {
      await axiosInstance.delete(`/audits/${auditId}/findings/${findingId}`);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["audits", variables.auditId] });
    },
  });
}

export function useOverdueFindings() {
  return useQuery<AuditFinding[]>({
    queryKey: ["audits", "overdue-findings"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/audits/findings/overdue");
      return data.data;
    },
  });
}
