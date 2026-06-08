import axiosInstance from "./axiosInstance";

export interface CopilotResponse {
  answer: string;
  data?: any;
  suggestedQueries?: string[];
}

export async function queryCopilot(q: string): Promise<CopilotResponse> {
  const response = await axiosInstance.post("/copilot/query", { q });
  return response.data.data;
}

export async function getCopilotSuggestions(): Promise<string[]> {
  const response = await axiosInstance.get("/copilot/suggestions");
  return response.data.data;
}
