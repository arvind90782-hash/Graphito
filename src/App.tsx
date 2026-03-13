import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Pages
import Home from './pages/Home';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar isDark={isDark} setIsDark={setIsDark} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Navigate to="/#services" replace />} />
            <Route path="/portfolio" element={<Navigate to="/#portfolio" replace />} />
            <Route path="/about" element={<Navigate to="/#about" replace />} />
            <Route path="/contact" element={<Navigate to="/#contact" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
