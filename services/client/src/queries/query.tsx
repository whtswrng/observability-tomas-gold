import { useEffect, useState } from "react";

// There are libraries that solves this issue and provide more feaures like caching, but I took this opportunity to write an interesting code that uses Typescript Generics
// https://tanstack.com/query/v4/docs/framework/react/quick-start
export function useQuery<T>(fetch: () => Promise<{ data: T }>): {
  data: T | undefined;
  error?: string;
  isLoading: boolean;
  abort: () => void;
  clear: () => void;
  refetch: () => void;
} {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string>();

  const doFetch = async () => {
    setIsLoading(true);
    try {
      // TODO abort requests using cancel token when spamming
      const res = await fetch();
      setData(res.data);
      setError(undefined);
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
  };

  return { isLoading, data, error, abort, clear, refetch };
}
