import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu, X, User, LogOut, LayoutDashboard, ShieldCheck, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { UserProfile } from '../types';
import { cn } from '../utils/cn';

interface NavbarProps {
  user: UserProfile | null;
  isDark: boolean;
  setIsDark: (val: boolean) => void;
}

export default function Navbar({ user, isDark, setIsDark }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '#home' },
    { name: 'Services', path: '#services' },
    { name: 'Work', path: '#portfolio' },
    { name: 'About', path: '#about' },
    { name: 'Contact', path: '#contact' },
  ];

  const handleSignOut = () => {
    signOut(auth);
  };

  const handleNavClick = (e: any, path: string) => {
    if (path.startsWith('#') && location.pathname === '/') {
      e.preventDefault();
      const id = path.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--glass-bg)] backdrop-blur-xl border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-brand-accent group-hover:scale-110 transition-transform duration-500">
              <img 
                src="https://lh3.googleusercontent.com/d/17H8RdzgfShm19oGSl3PwR2d45FosJGbN" 
                alt="Graphito Logo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-2xl font-display font-bold tracking-tighter text-[var(--text-primary)]">
              GRAPHITO<span className="text-brand-accent">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={location.pathname === '/' ? link.path : `/${link.path}`}
                onClick={(e) => handleNavClick(e, link.path)}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-brand-accent",
                  location.hash === link.path ? "text-brand-accent" : "text-[var(--text-primary)]/70"
                )}
              >
                {link.name}
              </a>
            ))}
            
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full glass glass-hover text-[var(--text-primary)]/70 hover:text-brand-accent transition-all"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {user ? (
              <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-[var(--border-color)]">
                <Link 
                  to={user.role === 'admin' ? '/admin' : '/dashboard'}
                  className="p-2 rounded-full glass glass-hover text-[var(--text-primary)]/70 hover:text-brand-accent"
                >
                  {user.role === 'admin' ? <ShieldCheck size={20} /> : <LayoutDashboard size={20} />}
                </Link>
                <button 
                  onClick={handleSignOut}
                  className="p-2 rounded-full glass glass-hover text-[var(--text-primary)]/70 hover:text-red-500"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="px-6 py-2 rounded-full bg-brand-accent text-white text-sm font-semibold hover:bg-brand-accent/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-brand-accent/20"
              >
                Client Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
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

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white/95 backdrop-blur-xl border-b border-black/[0.05] px-4 pt-2 pb-6 space-y-2"
        >
          {navLinks.map((link) => (
            <a
              key={link.path}
              href={location.pathname === '/' ? link.path : `/${link.path}`}
              onClick={(e) => handleNavClick(e, link.path)}
              className={cn(
                "block px-3 py-4 text-base font-medium rounded-2xl transition-all",
                location.hash === link.path ? "bg-brand-accent/10 text-brand-accent" : "text-brand-text/70"
              )}
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 border-t border-black/[0.05] flex items-center justify-between px-3">
            <button 
              onClick={() => setIsDark(!isDark)}
              className="flex items-center space-x-2 text-brand-text/70"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
              <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>
          <div className="pt-4 border-t border-black/[0.05]">
            {user ? (
              <div className="space-y-2">
                <Link
                  to={user.role === 'admin' ? '/admin' : '/dashboard'}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-2 px-3 py-4 text-brand-text/70"
                >
                  <LayoutDashboard size={20} />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 px-3 py-4 text-red-500 w-full text-left"
                >
                  <LogOut size={20} />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-6 py-4 rounded-2xl bg-brand-accent text-white font-semibold shadow-lg shadow-brand-accent/20"
              >
                Client Login
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
