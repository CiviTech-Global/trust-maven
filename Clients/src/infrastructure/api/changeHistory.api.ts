import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export interface ChangeHistoryEntry {
  id: string;
  entityType: string;
  entityId: string;
  action: "created" | "updated" | "deleted";
  fieldName: string | null;
  oldValue: string | null;
  newValue: string | null;
  changedById: string;
  changedAt: string;
}

interface ChangeHistoryResponse {
  entries: ChangeHistoryEntry[];
  total: number;
}

/**
 * Fetch change history for a specific entity.
 * Useful for displaying audit trails / activity feeds on detail pages.
 */
export function useChangeHistory(
  entityType: string,
  entityId: string | undefined,
  options?: { limit?: number; offset?: number },
) {
  return useQuery<ChangeHistoryResponse>({
    queryKey: ["change-history", entityType, entityId, options],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (options?.limit) params.set("limit", String(options.limit));
      if (options?.offset) params.set("offset", String(options.offset));
      const { data } = await axiosInstance.get(
        `/change-history/${entityType}/${entityId}?${params}`,
      );
      return data.data;
    },
    enabled: !!entityId,
  });
}
