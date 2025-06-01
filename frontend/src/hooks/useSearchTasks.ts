import { useState, useEffect } from "react";
import { api } from "../api/api";
import { Task } from "../api/types";
import { useDebouncedValue } from "./useDebouncedValue";

interface UseSearchResult {
  data: Task[] | null;
  loading: boolean;
  error: string | null;
}

export function useSearchTasks(rawQuery: string): UseSearchResult {
  const debouncedQuery = useDebouncedValue(rawQuery, 300);

  const [data, setData] = useState<Task[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setData(null);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    (async () => {
      try {
        const response = await api.get<Task[]>(`/tasks?search=${encodeURIComponent(debouncedQuery)}`);
        setData(response.data);
      } catch {
        setError("Search failed");
      } finally {
        setLoading(false);
      }
    })();
  }, [debouncedQuery]);

  return { data, loading, error };
}
