import React, { useState, useEffect } from 'react';
import { FlaskConical, Menu, X } from 'lucide-react';
import ModeToggle from './ModeToggle';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'О занятиях', href: '#audience' },
  { label: 'Тарифы', href: '#pricing' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'О преподавателе', href: '#about' },
  { label: 'Контакты', href: '#contact' },
];

export default function StickyHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-card/90 backdrop-blur-xl shadow-sm border-b border-border' : 'bg-transparent'}`} style={{ minWidth: 0 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20 gap-4 overflow-hidden">
          <a href="#" className="flex items-center gap-2 font-heading font-bold text-lg text-foreground whitespace-nowrap flex-shrink-0">
            <FlaskConical className="w-6 h-6 text-primary" />
            Химия · UI Demo
          </a>

          <nav className="hidden lg:flex items-center gap-6 flex-shrink-0">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
            <ModeToggle />
            <a
              href="https://arsenikum.ru/"
              className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-body font-semibold hover:opacity-90 transition-opacity"
            >
              Основной сайт
            </a>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-foreground">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card border-b border-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              <div className="flex justify-center pb-3">
                <ModeToggle />
              </div>
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-sm font-body text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="https://arsenikum.ru/"
                onClick={() => setMenuOpen(false)}
                className="block text-center bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-body font-semibold"
              >
                Основной сайт
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}