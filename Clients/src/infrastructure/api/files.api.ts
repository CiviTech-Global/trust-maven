import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import type { FileRecord } from "../../domain/interfaces";

export function useFilesByEntity(entityType: string | null, entityId: string | null) {
  return useQuery<FileRecord[]>({
    queryKey: ["files", entityType, entityId],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (entityType) params.set("entityType", entityType);
      if (entityId) params.set("entityId", entityId);
      const { data } = await axiosInstance.get(`/files?${params}`);
      return data.data;
    },
    enabled: !!entityType && !!entityId,
  });
}

export function useUploadFile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      file,
      relatedEntityType,
      relatedEntityId,
    }: {
      file: File;
      relatedEntityType?: string;
      relatedEntityId?: string;
    }) => {
      const formData = new FormData();
      formData.append("file", file);
      if (relatedEntityType) formData.append("relatedEntityType", relatedEntityType);
      if (relatedEntityId) formData.append("relatedEntityId", relatedEntityId);
      const { data } = await axiosInstance.post("/files", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["files", variables.relatedEntityType, variables.relatedEntityId],
      });
    },
  });
}

export function useDeleteFile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/files/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files"] });
    },
  });
}

export function getFileDownloadUrl(id: string): string {
  return `${axiosInstance.defaults.baseURL || "/api/v1"}/files/${id}`;
}
