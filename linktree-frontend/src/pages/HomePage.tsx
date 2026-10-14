import ProfileHeader from '../components/ProfileHeader';
import LinkList from '../components/LinkList';
import { useLinks } from '../hooks/useLinks';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const { links, loading, error } = useLinks();
  return <main className="page"><section className="card">
    <Link className="nav-link admin-shortcut" to="/admin">Управление ссылками →</Link>
    <ProfileHeader />
    {loading && <div className="status">Загрузка...</div>}
    {error && <div className="status error">{error}</div>}
    {!loading && !error && <LinkList links={links} />}
    <footer>Linktree Clone</footer>
  </section></main>;
}
