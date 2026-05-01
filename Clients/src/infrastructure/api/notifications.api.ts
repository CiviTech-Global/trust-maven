import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import type { NotificationItem } from "../../domain/interfaces";

export function useNotifications(page = 1) {
  return useQuery<{ notifications: NotificationItem[]; pagination: any }>({
    queryKey: ["notifications", page],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/notifications?page=${page}`);
      return { notifications: data.data, pagination: data.pagination };
    },
  });
}

export function useUnreadNotifications() {
  return useQuery<NotificationItem[]>({
    queryKey: ["notifications", "unread"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/notifications/unread");
      return data.data;
    },
  });
}

export function useUnreadCount() {
  return useQuery<number>({
    queryKey: ["notifications", "unread-count"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/notifications/unread/count");
      return data.data.count;
    },
    refetchInterval: 30000,
  });
}

export function useMarkRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.put(`/notifications/${id}/read`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

export function useMarkAllRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await axiosInstance.put("/notifications/read-all");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}
