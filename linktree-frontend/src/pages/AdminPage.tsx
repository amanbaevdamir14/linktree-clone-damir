import { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createLink, deleteLink, getLinks, updateLink } from '../api/linksApi';
import type { Link as LinkItem, LinkInput } from '../types/Link';

export default function AdminPage() {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [title, setTitle] = useState(''); const [url, setUrl] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [busy, setBusy] = useState(false); const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState(''); const [titleError, setTitleError] = useState(''); const [urlError, setUrlError] = useState('');
  async function refresh() { setPageError(''); try { setLinks(await getLinks()); } catch(e) { setPageError(e instanceof Error ? e.message : 'Не удалось загрузить ссылки'); } finally { setLoading(false); } }
  useEffect(() => { void refresh(); }, []);
  function reset() { setTitle(''); setUrl(''); setEditingId(null); setTitleError(''); setUrlError(''); }
  async function submit(e: FormEvent) {
    e.preventDefault(); setTitleError(''); setUrlError(''); setPageError('');
    let valid = true;
    if (!title.trim()) { setTitleError('Введите название'); valid = false; } else if (title.trim().length > 50) { setTitleError('Не более 50 символов'); valid = false; }
    if (!url.trim()) { setUrlError('Введите URL'); valid = false; } else if (!/^https?:\/\/.+/i.test(url.trim())) { setUrlError('URL должен начинаться с http:// или https://'); valid = false; } else if (url.trim().length > 2048) { setUrlError('Не более 2048 символов'); valid = false; }
    if (!valid) return;
    setBusy(true);
    try { const input: LinkInput = { title: title.trim(), url: url.trim() }; if (editingId === null) await createLink(input); else await updateLink(editingId, input); reset(); await refresh(); }
    catch(e) { setPageError(e instanceof Error ? e.message : 'Не удалось сохранить ссылку'); } finally { setBusy(false); }
  }
  function edit(link: LinkItem) { setEditingId(link.id); setTitle(link.title); setUrl(link.url); setTitleError(''); setUrlError(''); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  async function remove(link: LinkItem) { if (!window.confirm(`Удалить ссылку «${link.title}»?`)) return; setPageError(''); try { await deleteLink(link.id); if (editingId === link.id) reset(); await refresh(); } catch(e) { setPageError(e instanceof Error ? e.message : 'Не удалось удалить ссылку'); } }
  return <main className="admin-page"><section className="admin-card">
    <div className="admin-top"><Link className="nav-link" to="/">← На главную</Link><span className="eyebrow">LINKTREE CLONE</span></div>
    <h1>Управление ссылками</h1><p className="muted">Добавляйте, редактируйте и удаляйте ссылки публичной страницы.</p>
    <form className="link-form" onSubmit={submit} noValidate><h2>{editingId === null ? 'Добавить ссылку' : 'Редактировать ссылку'}</h2>
      <label htmlFor="link-title">Название</label><input id="link-title" value={title} maxLength={50} onChange={e => setTitle(e.target.value)} placeholder="Например, GitHub" aria-invalid={!!titleError}/>{titleError && <small className="field-error">{titleError}</small>}
      <label htmlFor="link-url">URL</label><input id="link-url" value={url} maxLength={2048} onChange={e => setUrl(e.target.value)} placeholder="https://example.com" aria-invalid={!!urlError}/>{urlError && <small className="field-error">{urlError}</small>}
      <div className="form-actions"><button className="primary-button" type="submit" disabled={busy}>{busy ? 'Сохранение...' : editingId === null ? 'Добавить ссылку' : 'Сохранить'}</button>{editingId !== null && <button className="secondary-button" type="button" onClick={reset} disabled={busy}>Отмена</button>}</div>
    </form>
    {pageError && <div className="notice error" role="alert">{pageError}</div>}
    <div className="table-heading"><h2>Все ссылки</h2><span>{links.length}</span></div>
    {loading ? <p className="muted">Загрузка ссылок...</p> : links.length === 0 ? <p className="muted">Ссылок пока нет. Добавьте первую выше.</p> : <div className="table-wrap"><table><thead><tr><th>Название</th><th>Адрес</th><th>Действия</th></tr></thead><tbody>{links.map(link => <tr key={link.id}><td className="link-title-cell">{link.title}</td><td><a href={link.url} target="_blank" rel="noreferrer" className="url-cell">{link.url}</a></td><td><div className="row-actions"><button type="button" className="secondary-button" onClick={() => edit(link)}>Изменить</button><button type="button" className="danger-button" onClick={() => void remove(link)}>Удалить</button></div></td></tr>)}</tbody></table></div>}
  </section></main>;
}
