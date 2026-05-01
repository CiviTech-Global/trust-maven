import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export interface SearchResult {
  id: string;
  entityType: string;
  title: string;
  subtitle?: string;
  matchedField: string;
  route: string;
}

export interface GroupedSearchResults {
  [entityType: string]: {
    results: SearchResult[];
    count: number;
  };
}

interface SearchResponse {
  results: GroupedSearchResults;
  totalCount: number;
  query: string;
}

/**
 * Global search hook — searches across all entities.
 * Only fires when query is >= 2 characters.
 */
export function useGlobalSearch(query: string, limit = 10) {
  return useQuery<SearchResponse>({
    queryKey: ["search", query, limit],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/search?q=${encodeURIComponent(query)}&limit=${limit}`,
      );
      return data.data;
    },
    enabled: query.trim().length >= 2,
    staleTime: 30_000,
  });
}
