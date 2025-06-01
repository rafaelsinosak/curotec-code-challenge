import { useState, useEffect } from "react";
import { api } from "../api/api";
import { Task } from "../api/types";

interface UseFetchResult {
  data: Task[] | null;
  loading: boolean;
  error: string | null;
}

export function useFetchTasks(refresh: number): UseFetchResult {
  const [data, setData] = useState<Task[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const response = await api.get<Task[]>("/tasks");
        setData(response.data);
      } catch {
        setError("Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    })();
  }, [refresh]);

  return { data, loading, error };
}
