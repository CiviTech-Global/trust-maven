import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export interface ControlCoverage {
  totalRisks: number;
  coveredRisks: number;
  gaps: number;
  coveragePercent: number;
  highRiskGaps: number;
  gapDetails: { id: string; title: string; domain: string; score: number }[];
}

export function useControlCoverage() {
  return useQuery<ControlCoverage>({
    queryKey: ["coverage", "control-coverage"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/coverage/control-coverage");
      return data.data;
    },
  });
}
