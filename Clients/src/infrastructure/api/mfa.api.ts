import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

interface MfaStatus {
  isEnabled: boolean;
  isConfigured: boolean;
}

interface MfaSetupResult {
  secret: string;
  otpauth: string;
}

export function useMfaStatus() {
  return useQuery<MfaStatus>({
    queryKey: ["mfa", "status"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/auth/mfa/status");
      return data.data;
    },
  });
}

export function useMfaSetup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { data } = await axiosInstance.post("/auth/mfa/setup");
      return data.data as MfaSetupResult;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mfa"] });
    },
  });
}

export function useMfaEnable() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (token: string) => {
      await axiosInstance.post("/auth/mfa/enable", { token });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mfa"] });
    },
  });
}

export function useMfaDisable() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (token?: string) => {
      await axiosInstance.post("/auth/mfa/disable", { token });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mfa"] });
    },
  });
}
