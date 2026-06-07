import { useState, useCallback, useEffect } from "react";

export interface SavedSearch {
  id: string;
  name: string;
  page: string;
  filters: Record<string, string>;
  createdAt: string;
}

const STORAGE_KEY = "trustmaven_saved_searches";

function loadSearches(): SavedSearch[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveSearches(searches: SavedSearch[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(searches));
}

export function useSavedSearches(page?: string) {
  const [searches, setSearches] = useState<SavedSearch[]>([]);

  useEffect(() => {
    setSearches(page ? loadSearches().filter((s) => s.page === page) : loadSearches());
  }, [page]);

  const saveSearch = useCallback((name: string, filters: Record<string, string>, searchPage?: string) => {
    const all = loadSearches();
    const newSearch: SavedSearch = {
      id: crypto.randomUUID?.() || Date.now().toString(),
      name,
      page: searchPage || page || "general",
      filters,
      createdAt: new Date().toISOString(),
    };
    all.push(newSearch);
    saveSearches(all);
    setSearches(page ? all.filter((s) => s.page === page) : all);
  }, [page]);

  const deleteSearch = useCallback((id: string) => {
    const all = loadSearches().filter((s) => s.id !== id);
    saveSearches(all);
    setSearches(page ? all.filter((s) => s.page === page) : all);
  }, [page]);

  const applySearch = useCallback((search: SavedSearch) => {
    return search.filters;
  }, []);

  return { searches, saveSearch, deleteSearch, applySearch };
}
