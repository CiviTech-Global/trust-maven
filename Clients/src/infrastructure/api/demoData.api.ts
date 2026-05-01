import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export function useDemoDataStatus() {
  return useQuery<{ hasDemoData: boolean }>({
    queryKey: ["demoData", "status"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/demo-data/status");
      return data.data;
    },
  });
}

export function useCreateDemoData() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { data } = await axiosInstance.post("/demo-data");
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}

export function useDeleteDemoData() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await axiosInstance.delete("/demo-data");
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}
