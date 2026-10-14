import type { Link } from '../types/Link';
import LinkButton from './LinkButton';

export default function LinkList({ links }: { links: Link[] }) {
  return <div className="links">{links.map(link => <LinkButton key={link.id} link={link} />)}</div>;
}
