import type { Link, LinkInput } from '../types/Link';

const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:8080').replace(/\/$/, '');
const LINKS_URL = `${API_BASE}/api/links`;

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try { response = await fetch(url, { ...init, headers: { 'Content-Type': 'application/json', ...init?.headers } }); }
  catch { throw new Error('Сервер недоступен. Проверьте, запущены ли backend и PostgreSQL.'); }
  if (!response.ok) {
    let message = `Ошибка сервера (${response.status})`;
    try { const body = await response.json(); message = body.errors ? Object.values(body.errors).join('. ') : (body.message || message); } catch {}
    throw new Error(message);
  }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}
export const getLinks = () => request<Link[]>(LINKS_URL);
export const createLink = (input: LinkInput) => request<Link>(LINKS_URL, { method: 'POST', body: JSON.stringify(input) });
export const updateLink = (id: number, input: LinkInput) => request<Link>(`${LINKS_URL}/${id}`, { method: 'PUT', body: JSON.stringify(input) });
export const deleteLink = (id: number) => request<void>(`${LINKS_URL}/${id}`, { method: 'DELETE' });
export const fetchLinks = getLinks;
