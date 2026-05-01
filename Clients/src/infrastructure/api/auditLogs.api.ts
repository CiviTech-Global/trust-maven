import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import type { AuditLogEntry } from "../../domain/interfaces";

interface AuditLogFilters {
  entityType?: string;
  entityId?: string;
  userId?: string;
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
}

export function useAuditLogs(filters?: AuditLogFilters) {
  return useQuery<{ logs: AuditLogEntry[]; pagination: { page: number; limit: number; total: number; totalPages: number } }>({
    queryKey: ["audit-logs", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.entityType) params.set("entityType", filters.entityType);
      if (filters?.entityId) params.set("entityId", filters.entityId);
      if (filters?.userId) params.set("userId", filters.userId);
      if (filters?.from) params.set("from", filters.from);
      if (filters?.to) params.set("to", filters.to);
      if (filters?.page) params.set("page", filters.page.toString());
      if (filters?.limit) params.set("limit", filters.limit.toString());
      const { data } = await axiosInstance.get(`/audit-logs?${params}`);
      return { logs: data.data, pagination: data.pagination };
    },
  });
}

export function useEntityAuditLogs(entityType: string | null, entityId: string | null) {
  return useQuery<AuditLogEntry[]>({
    queryKey: ["audit-logs", "entity", entityType, entityId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/audit-logs/entity/${entityType}/${entityId}`);
      return data.data;
    },
    enabled: !!entityType && !!entityId,
  });
}
