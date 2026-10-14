import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  return (
    <button className="theme-toggle" onClick={onToggle} aria-label="Переключить тему">
      {dark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
