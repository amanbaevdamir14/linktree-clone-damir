import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ThemeToggle from './components/ThemeToggle';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';

export default function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');
  useEffect(() => { document.documentElement.classList.toggle('dark', dark); localStorage.setItem('theme', dark ? 'dark' : 'light'); }, [dark]);
  return <BrowserRouter><div className="theme-control"><ThemeToggle dark={dark} onToggle={() => setDark(value => !value)} /></div><Routes><Route path="/" element={<HomePage />} /><Route path="/admin" element={<AdminPage />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes></BrowserRouter>;
}
