import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLanguage, Language } from '@/contexts/LanguageContext';

const Navbar = () => {
  const { lang, setLang, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const navItems = [
    { key: 'nav.services', href: isHome ? '#services' : '/#services' },
    { key: 'nav.howItWorks', href: isHome ? '#how-it-works' : '/#how-it-works' },
    { key: 'nav.offers', href: isHome ? '#offers' : '/#offers' },
    { key: 'nav.technology', href: isHome ? '#technology' : '/#technology' },
    { key: 'nav.faq', href: isHome ? '#faq' : '/#faq' },
    { key: 'nav.simulator', href: '/simulator', isRoute: true },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
    { code: 'ar', label: 'AR' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-oxford/95 backdrop-blur-md border-b border-gold/10"
    >
      <div className="container mx-auto flex items-center justify-between h-16 md:h-20 px-4">
        <a href="#" className="font-display text-2xl md:text-3xl font-bold tracking-wider text-primary-foreground">
          DOMO<span className="text-gold">SIA</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            item.isRoute ? (
              <Link
                key={item.key}
                to={item.href}
                className="text-sm font-medium text-primary-foreground/80 hover:text-gold transition-colors duration-300 gold-underline"
              >
                {t(item.key)}
              </Link>
            ) : (
              <a
                key={item.key}
                href={item.href}
                className="text-sm font-medium text-primary-foreground/80 hover:text-gold transition-colors duration-300 gold-underline"
              >
                {t(item.key)}
              </a>
            )
          ))}
        </div>

        {/* Language Switcher */}
        <div className="hidden md:flex items-center gap-1 bg-oxford-light/50 rounded-full p-1">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => setLang(l.code)}
              className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-300 ${
                lang === l.code
                  ? 'bg-gradient-gold text-oxford font-bold'
                  : 'text-primary-foreground/70 hover:text-primary-foreground'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-primary-foreground p-2"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-oxford border-t border-gold/10 overflow-hidden"
          >
            <div className="flex flex-col px-4 py-4 gap-3">
              {navItems.map((item) => (
                item.isRoute ? (
                  <Link
                    key={item.key}
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-medium text-primary-foreground/80 hover:text-gold py-2 transition-colors"
                  >
                    {t(item.key)}
                  </Link>
                ) : (
                  <a
                    key={item.key}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-medium text-primary-foreground/80 hover:text-gold py-2 transition-colors"
                  >
                    {t(item.key)}
                  </a>
                )
              ))}
              <div className="flex gap-2 pt-2">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setMobileOpen(false); }}
                    className={`px-4 py-2 text-xs font-semibold rounded-full transition-all ${
                      lang === l.code
                        ? 'bg-gradient-gold text-oxford'
                        : 'border border-gold/30 text-primary-foreground/70'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
