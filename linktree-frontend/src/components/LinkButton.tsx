import { ExternalLink } from 'lucide-react';
import type { Link } from '../types/Link';

export default function LinkButton({ link }: { link: Link }) {
  return (
    <a className="link-button" href={link.url} target="_blank" rel="noopener noreferrer">
      <span>{link.title}</span>
      <ExternalLink size={18} />
    </a>
  );
}
