import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

interface ScoreSuggestion {
  suggestedLikelihood: number;
  suggestedImpact: number;
  reasoning: string;
  confidence: "high" | "medium" | "low";
}

interface TreatmentSuggestion {
  suggestedStrategies: Array<{ strategy: string; label: string; reasoning: string }>;
}

export function useAiScoreSuggestion(riskId: string | null) {
  return useQuery<ScoreSuggestion>({
    queryKey: ["ai", "suggest-score", riskId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/risks/${riskId}/ai/suggest-score`);
      return data.data;
    },
    enabled: !!riskId,
    staleTime: 0,
  });
}

export function useAiTreatmentSuggestion(riskId: string | null) {
  return useQuery<TreatmentSuggestion>({
    queryKey: ["ai", "suggest-treatment", riskId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/risks/${riskId}/ai/suggest-treatment`);
      return data.data;
    },
    enabled: !!riskId,
    staleTime: 0,
  });
}
