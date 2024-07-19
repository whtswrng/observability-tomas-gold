import { useEffect, useState } from "react";

export function useQuery<T>(fetch: () => Promise<{data: T}>): {
  data: T | undefined;
  error?: string;
  isLoading: boolean;
  abort: () => void;
  clear: () => void;
  refetch: () => void;
} {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string>();

  const doFetch = async () => {
    setIsLoading(true);
    try {
      const res = await fetch();
      setData(res.data);
    } catch (e) {
      setError((e as Error)?.message ?? "Something went wrong");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    doFetch();
  }, []);

  const abort = () => {};

  const clear = () => {
    setData(undefined);
    setIsLoading(false);
  };

  const refetch = () => {
    doFetch();
  }

  return { isLoading, data, error, abort, clear, refetch };
}
