import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { cn } from '../utils/cn';

interface NavbarProps {
  isDark: boolean;
  setIsDark: Dispatch<SetStateAction<boolean>>;
}

const navLinks = [
  { name: 'Home', path: '#home' },
  { name: 'Services', path: '#services' },
  { name: 'Work', path: '#portfolio' },
  { name: 'About', path: '#about' },
  { name: 'Contact', path: '#contact' },
];

export default function Navbar({ isDark, setIsDark }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [activeHash, setActiveHash] = useState(() => location.hash || '#home');

  useEffect(() => {
    setActiveHash(location.hash || '#home');
  }, [location.hash]);

  useEffect(() => {
    const syncHash = () => {
      setActiveHash(window.location.hash || '#home');
    };

    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, []);

  const resolveHref = (path: string) => (location.pathname === '/' ? path : `/${path}`);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-[var(--glass-bg)] backdrop-blur-xl border-b border-[var(--border-color)] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-4 group">
            <div className="relative w-12 h-12 shrink-0 rounded-full overflow-hidden border-2 border-brand-accent group-hover:scale-110 transition-transform duration-500">
              <img
                src="https://lh3.googleusercontent.com/d/17H8RdzgfShm19oGSl3PwR2d45FosJGbN"
                alt="Graphito Logo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="brand-wordmark text-[1.4rem] sm:text-[2rem] font-display font-normal text-[var(--text-primary)]">
              GRAPHITO<span className="ml-1 text-brand-accent">.</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = activeHash === link.path;

              return (
                <a
                  key={link.path}
                  href={resolveHref(link.path)}
                  data-active={isActive}
                  className={cn(
                    'navbar-link text-sm font-medium transition-colors duration-300',
                    isActive ? 'text-brand-accent' : 'text-[var(--text-primary)]/70'
                  )}
                >
                  {link.name}
                </a>
              );
            })}

            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full glass glass-hover text-[var(--text-primary)]/70 hover:text-brand-accent transition-all"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-brand-text/70 hover:text-brand-text"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[var(--glass-bg)] backdrop-blur-xl border-b border-[var(--border-color)] px-4 pt-2 pb-6 space-y-2 shadow-lg"
        >
          {navLinks.map((link) => (
            <a
              key={link.path}
              href={resolveHref(link.path)}
              onClick={() => setIsOpen(false)}
              className={cn(
                'block px-3 py-4 text-base font-medium rounded-2xl transition-all',
                activeHash === link.path ? 'bg-brand-accent/10 text-brand-accent' : 'text-brand-text/70'
              )}
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 border-t border-[var(--border-color)] flex items-center justify-between px-3">
            <button
              onClick={() => setIsDark(!isDark)}
              className="flex items-center space-x-2 text-brand-text/70"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
              <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
