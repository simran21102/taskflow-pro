import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { api, messageFromError } from '../services/api';

export const useApi = (path, options = {}) => {
  const [data, setData] = useState(options.initialData || null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(path, { params: options.params });
      setData(response.data);
    } catch (error) {
      toast.error(messageFromError(error));
    } finally {
      setLoading(false);
    }
  }, [path, JSON.stringify(options.params || {})]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, setData, loading, reload: load };
};
