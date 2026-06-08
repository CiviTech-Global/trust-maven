import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export interface Integration {
  id: string;
  organizationId: string;
  connectorType: string;
  name: string;
  config: Record<string, any>;
  status: "connected" | "disconnected" | "error";
  lastSyncAt: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IntegrationEvent {
  id: string;
  integrationId: string;
  eventType: string;
  status: string;
  message: string | null;
  payload: any;
  matchedEvidenceId: string | null;
  collectedAt: string;
}

export interface AvailableConnector {
  type: string;
  name: string;
  description: string;
  configFields: { key: string; label: string; type: string; required: boolean }[];
}

export interface DashboardSummary {
  total: number;
  connected: number;
  disconnected: number;
  error: number;
  lastSyncAt: string | null;
}

export interface EntityItem {
  id: string;
  organizationId: string;
  name: string;
  type: string;
  parentId: string | null;
  attributes: Record<string, any> | null;
  riskScore: number | null;
  isActive: boolean;
  children?: EntityItem[];
}

export interface TrustCenterConfig {
  id: string;
  isPublic: boolean;
  companyName: string;
  companyLogo: string | null;
  description: string | null;
  supportEmail: string | null;
  supportUrl: string | null;
  certifications: any[];
  controls: any[];
}

export interface FairAnalysis {
  id: string;
  riskId: string;
  methodology: string;
  lossEventFrequency: any;
  lossMagnitude: any;
  annualLossExpectancy: number | null;
  simulationRuns: number;
  simulationResults: any;
}

export interface ExposureSummary {
  totalALE: number;
  averageALE: number;
  riskCount: number;
  topRisks: { riskId: string; riskTitle: string; ale: number }[];
}

export function useIntegrations(filters?: { connectorType?: string; status?: string }) {
  return useQuery<Integration[]>({
    queryKey: ["integrations", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.connectorType) params.set("connectorType", filters.connectorType);
      if (filters?.status) params.set("status", filters.status);
      const { data } = await axiosInstance.get(`/integrations?${params}`);
      return data.data;
    },
  });
}

export function useIntegration(id: string | null) {
  return useQuery<Integration>({
    queryKey: ["integrations", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/integrations/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
}

export function useAvailableConnectors() {
  return useQuery<AvailableConnector[]>({
    queryKey: ["integrations", "available"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/integrations/available");
      return data.data;
    },
    staleTime: 1000 * 60 * 30,
  });
}

export function useIntegrationHistory(integrationId: string | null) {
  return useQuery<IntegrationEvent[]>({
    queryKey: ["integrations", "history", integrationId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/integrations/${integrationId}/history`);
      return data.data;
    },
    enabled: !!integrationId,
  });
}

export function useIntegrationDashboardSummary() {
  return useQuery<DashboardSummary>({
    queryKey: ["integrations", "dashboard", "summary"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/integrations/dashboard/summary");
      return data.data;
    },
  });
}

export function useCreateIntegration() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { connectorType: string; name: string; config: Record<string, any> }) => {
      const { data } = await axiosInstance.post("/integrations", payload);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["integrations"] });
    },
  });
}

export function useUpdateIntegration() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & Partial<Integration>) => {
      const { data } = await axiosInstance.put(`/integrations/${id}`, updates);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["integrations"] });
    },
  });
}

export function useDeleteIntegration() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/integrations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["integrations"] });
    },
  });
}

export function useTestIntegrationConnection() {
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.post(`/integrations/${id}/test`);
      return data.data;
    },
  });
}

export function useSyncIntegration() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.post(`/integrations/${id}/sync`);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["integrations", "history"] });
    },
  });
}

/* Entities */
export function useEntities(filters?: { parentId?: string; type?: string }) {
  return useQuery<EntityItem[]>({
    queryKey: ["entities", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.parentId) params.set("parentId", filters.parentId);
      if (filters?.type) params.set("type", filters.type);
      const { data } = await axiosInstance.get(`/entities?${params}`);
      return data.data;
    },
  });
}

export function useEntityTree() {
  return useQuery<EntityItem[]>({
    queryKey: ["entities", "tree"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/entities/tree");
      return data.data;
    },
  });
}

export function useEntity(id: string | null) {
  return useQuery<EntityItem>({
    queryKey: ["entities", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/entities/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
}

export function useEntityAncestors(id: string | null) {
  return useQuery<EntityItem[]>({
    queryKey: ["entities", id, "ancestors"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/entities/${id}/ancestors`);
      return data.data;
    },
    enabled: !!id,
  });
}

export function useEntityRisks(id: string | null) {
  return useQuery<any[]>({
    queryKey: ["entities", id, "risks"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/entities/${id}/risks`);
      return data.data;
    },
    enabled: !!id,
  });
}

export function useCreateEntity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { name: string; type: string; parentId?: string | null; attributes?: Record<string, any> }) => {
      const { data } = await axiosInstance.post("/entities", payload);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entities"] });
    },
  });
}

export function useUpdateEntity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & Partial<EntityItem>) => {
      const { data } = await axiosInstance.put(`/entities/${id}`, updates);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entities"] });
    },
  });
}

export function useDeleteEntity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/entities/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entities"] });
    },
  });
}

export function useRollupEntityScore() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.post(`/entities/${id}/rollup`);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entities"] });
    },
  });
}

/* Trust Center */
export function useTrustCenterConfig() {
  return useQuery<TrustCenterConfig>({
    queryKey: ["trust-center", "config"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/trust-center/config");
      return data.data;
    },
  });
}

export function useUpdateTrustCenterConfig() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Partial<TrustCenterConfig>) => {
      const { data } = await axiosInstance.put("/trust-center/config", payload);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trust-center"] });
    },
  });
}

export function useToggleTrustCenterPublic() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { data } = await axiosInstance.post("/trust-center/toggle");
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trust-center"] });
    },
  });
}

export function usePublicTrustCenter(orgId: string | null) {
  return useQuery<TrustCenterConfig>({
    queryKey: ["trust-center", "public", orgId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/trust-center/public/${orgId}`);
      return data.data;
    },
    enabled: !!orgId,
  });
}

/* FAIR Analysis */
export function useFairAnalyses(riskId: string | null) {
  return useQuery<FairAnalysis[]>({
    queryKey: ["fair-analysis", riskId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/fair-analysis/risk/${riskId}`);
      return data.data;
    },
    enabled: !!riskId,
  });
}

export function useFairAnalysis(id: string | null) {
  return useQuery<FairAnalysis>({
    queryKey: ["fair-analysis", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/fair-analysis/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
}

export function useCreateFairAnalysis() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Partial<FairAnalysis>) => {
      const { data } = await axiosInstance.post("/fair-analysis", payload);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fair-analysis"] });
    },
  });
}

export function useUpdateFairAnalysis() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & Partial<FairAnalysis>) => {
      const { data } = await axiosInstance.put(`/fair-analysis/${id}`, updates);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fair-analysis"] });
    },
  });
}

export function useDeleteFairAnalysis() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/fair-analysis/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fair-analysis"] });
    },
  });
}

export function useSimulateFairAnalysis() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.post(`/fair-analysis/${id}/simulate`);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fair-analysis"] });
    },
  });
}

export function useFairExposureSummary() {
  return useQuery<ExposureSummary>({
    queryKey: ["fair-analysis", "exposure", "summary"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/fair-analysis/exposure/summary");
      return data.data;
    },
  });
}

/* TPRM */
export function useVendorRiskTrend(vendorId: string | null) {
  return useQuery<any[]>({
    queryKey: ["tprm", "risk-trend", vendorId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/tprm/vendors/${vendorId}/risk-trend`);
      return data.data;
    },
    enabled: !!vendorId,
  });
}

export function useOverdueAssessments() {
  return useQuery<any[]>({
    queryKey: ["tprm", "overdue"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/tprm/overdue");
      return data.data;
    },
  });
}

export function useScoreQuestionnaire() {
  return useMutation({
    mutationFn: async (payload: { vendorId: string; questionnaire: any[] }) => {
      const { data } = await axiosInstance.post("/tprm/score-questionnaire", payload);
      return data.data;
    },
  });
}

export function useGenerateQuestionnaire(type: string | null) {
  return useQuery<any>({
    queryKey: ["tprm", "questionnaire", type],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/tprm/questionnaire/${type}`);
      return data.data;
    },
    enabled: !!type,
  });
}
