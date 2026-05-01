import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import { ReportTemplate } from "../../domain/interfaces";

export function useReportTemplates() {
  return useQuery<ReportTemplate[]>({
    queryKey: ["report-templates"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/reports");
      return data.data;
    },
  });
}

export function useReportTemplate(id: string) {
  return useQuery<ReportTemplate>({
    queryKey: ["report-templates", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/reports/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
}

export function useCreateReportTemplate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (template: Partial<ReportTemplate>) => {
      const { data } = await axiosInstance.post("/reports", template);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["report-templates"] });
    },
  });
}

export function useUpdateReportTemplate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & Partial<ReportTemplate>) => {
      const { data } = await axiosInstance.put(`/reports/${id}`, updates);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["report-templates"] });
    },
  });
}

export function useDeleteReportTemplate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/reports/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["report-templates"] });
    },
  });
}

export function useGenerateReport(id: string, format: "json" | "csv" = "json") {
  return useQuery({
    queryKey: ["report-generate", id, format],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/reports/${id}/generate?format=${format}`);
      return data.data || data;
    },
    enabled: false, // Manual trigger
  });
}

export function useEntitySchema(entityType: string) {
  return useQuery<{ field: string; label: string; type: string }[]>({
    queryKey: ["report-schema", entityType],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/reports/schema/${entityType}`);
      return data.data;
    },
    enabled: !!entityType,
  });
}
