import { useEffect, useState, useCallback } from 'react';
import fetch from '@/services/utils/fetch';
import { axiosOptions } from '@/services/utils/api';

interface Props {
  deps?: (boolean | string | number)[];
  skip?: boolean;
  options: axiosOptions;
}

function useRequest<T>({ deps = [], skip = false, options }: Props) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const refetch = useCallback(
    async (args?: axiosOptions) => {
      setIsLoading(true);
      setError(null);

      try {
        const { data: fetchedData } = await fetch({ ...options, ...args });
        setData(() => fetchedData);
        return { data: fetchedData };
      } catch (err) {
        setError(() => err);
        return { error: err };
      } finally {
        setIsLoading(false);
      }
    },
    [options],
  );

  useEffect(() => {
    if (skip) return;
    refetch();
  }, deps);

  return { data, isLoading, error, fetch: refetch };
}

export default useRequest;
