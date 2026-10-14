import { useEffect, useState } from 'react';
import type { Link } from '../types/Link';
import { getLinks } from '../api/linksApi';
export function useLinks() {
  const [links, setLinks] = useState<Link[]>([]); const [loading, setLoading] = useState(true); const [error, setError] = useState('');
  useEffect(() => { getLinks().then(setLinks).catch(e => setError(e instanceof Error ? e.message : 'Не удалось загрузить ссылки')).finally(() => setLoading(false)); }, []);
  return { links, loading, error };
}
