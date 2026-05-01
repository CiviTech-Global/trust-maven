import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import { ControlMonitoringEvent } from "../../domain/interfaces";

export function useMonitoringEvents(controlId: string) {
  return useQuery<ControlMonitoringEvent[]>({
    queryKey: ["monitoring-events", controlId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/controls/${controlId}/monitoring-events`);
      return data.data;
    },
    enabled: !!controlId,
  });
}

export function useRecordMonitoringEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ controlId, ...event }: { controlId: string; status: string; notes?: string; evidence?: string }) => {
      const { data } = await axiosInstance.post(`/controls/${controlId}/monitoring-events`, event);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["monitoring-events"] });
      queryClient.invalidateQueries({ queryKey: ["monitoring-dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["controls"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useMonitoringDashboard() {
  return useQuery<{ counts: { healthy: number; at_risk: number; failing: number; not_monitored: number; overdue: number }; total: number }>({
    queryKey: ["monitoring-dashboard"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/control-monitoring/dashboard");
      return data.data;
    },
  });
}

export function useOverdueControls() {
  return useQuery({
    queryKey: ["monitoring-overdue"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/control-monitoring/overdue");
      return data.data;
    },
  });
}

export function useFailingControls() {
  return useQuery({
    queryKey: ["monitoring-failing"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/control-monitoring/failing");
      return data.data;
    },
  });
}
