import { Link } from 'react-router-dom';
import { Instagram, Mail, Phone, Heart, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { hasGeminiApiKey } from '../utils/genai';

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-color)] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-brand-accent group-hover:scale-110 transition-transform duration-500">
                <img 
                  src="https://lh3.googleusercontent.com/d/17H8RdzgfShm19oGSl3PwR2d45FosJGbN" 
                  alt="Graphito Logo" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-3xl font-display font-bold tracking-tighter text-[var(--text-primary)]">
                GRAPHITO<span className="text-brand-accent">.</span>
              </span>
            </Link>
            <p className="text-[var(--text-primary)]/50 max-w-md mb-8 leading-relaxed">
              Premium creative digital agency specializing in graphic design, video editing, motion graphics, and digital branding. We transform ideas into stunning visual experiences.
            </p>
            <div className="flex space-x-4">
              <motion.a 
                href="https://www.instagram.com/graphito_in?igsh=Z3cxYjZ0MDd3NmFq" 
                target="_blank" 
                rel="noreferrer" 
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full glass glass-hover text-[var(--text-primary)]/50 hover:text-brand-accent transition-all"
                title="Instagram"
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a 
                href="https://chat.whatsapp.com/DHaZqHKVa4GAfLs5BtsZUb" 
                target="_blank" 
                rel="noreferrer" 
                whileHover={{ scale: 1.2, rotate: -10 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full glass glass-hover text-[var(--text-primary)]/50 hover:text-[#25D366] transition-all"
                title="WhatsApp"
              >
                <MessageCircle size={20} />
              </motion.a>
            </div>
          </div>

          <div>
            <h4 className="text-[var(--text-primary)] font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/services" className="text-[var(--text-primary)]/50 hover:text-brand-accent transition-colors">Services</Link></li>
              <li><Link to="/portfolio" className="text-[var(--text-primary)]/50 hover:text-brand-accent transition-colors">Portfolio</Link></li>
              <li><Link to="/about" className="text-[var(--text-primary)]/50 hover:text-brand-accent transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-[var(--text-primary)]/50 hover:text-brand-accent transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[var(--text-primary)] font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-[var(--text-primary)]/50">
                <Mail size={18} className="text-brand-accent" />
                <span>contact@graphitoagency.com</span>
              </li>
              <li className="flex items-center space-x-3 text-[var(--text-primary)]/50">
                <Phone size={18} className="text-brand-accent" />
                <span>+91 7705090700</span>
              </li>
              <li className="flex items-center space-x-3 text-[var(--text-primary)]/50">
                <Phone size={18} className="text-brand-accent" />
                <span>+91 9277072409</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-[var(--border-color)] flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-6">
          <p className="text-[var(--text-primary)]/30 text-sm">
            © {new Date().getFullYear()} Graphito Creative Agency. All rights reserved.
          </p>
          <div className="flex items-center space-x-1 text-[var(--text-primary)]/30 text-sm">
            <span>Made with</span>
            <Heart size={14} className="text-red-500 fill-red-500" />
            <span>by</span>
            <span className="text-[var(--text-primary)]/60 font-medium">Editor Nishant</span>
          </div>
          {hasGeminiApiKey && (
            <span className="rounded-full border border-brand-accent/40 px-3 py-1 text-[var(--text-primary)]/60 text-[11px] font-semibold uppercase tracking-wider">
              Google AI Studio key loaded
            </span>
          )}
        </div>
      </div>
    </footer>
  );
}
