import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export interface DashboardStats {
  totalRisks: number;
  criticalRisks: number;
  activeProjects: number;
  openTreatments: number;
  risksByDomain: { domain: string; count: string }[];
  risksByStatus: { status: string; count: string }[];
  recentRisks: any[];
}

export function useDashboardStats() {
  return useQuery<DashboardStats>({
    queryKey: ["dashboard", "stats"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/dashboard/stats");
      return data.data;
    },
  });
}

export function useDashboardActivity(limit = 10) {
  return useQuery({
    queryKey: ["dashboard", "activity", limit],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/dashboard/activity?limit=${limit}`);
      return data.data;
    },
  });
}

export function useDashboardTrends() {
  return useQuery<{ month: string; count: string }[]>({
    queryKey: ["dashboard", "trends"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/dashboard/trends");
      return data.data;
    },
  });
}

export function useOverdueTreatments() {
  return useQuery<any[]>({
    queryKey: ["dashboard", "overdue"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/dashboard/overdue");
      return data.data;
    },
  });
}
