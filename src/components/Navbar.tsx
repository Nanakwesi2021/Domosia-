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
    { key: 'nav.about', href: '/about', isRoute: true },
    { key: 'nav.services', href: isHome ? '#services' : '/#services' },
    { key: 'nav.howItWorks', href: isHome ? '#how-it-works' : '/#how-it-works' },
    { key: 'nav.technology', href: isHome ? '#technology' : '/#technology' },
    { key: 'nav.offers', href: isHome ? '#offers' : '/#offers' },
    { key: 'nav.faq', href: '/faq', isRoute: true },
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
        <Link to="/" className="font-display text-2xl md:text-3xl font-bold tracking-wider text-primary-foreground">
          DOMO<span className="text-gold">SIA</span>
        </Link>

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
          className="md:hidden text-primary-foreground p-2 focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 top-[64px] bg-black/60 backdrop-blur-sm z-[-1]"
            />
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-oxford border-t border-gold/10 overflow-hidden shadow-2xl"
            >
              <div className="flex flex-col px-6 py-8 gap-1">
                {navItems.map((item) => (
                  item.isRoute ? (
                    <Link
                      key={item.key}
                      to={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-base font-medium text-primary-foreground/90 hover:text-gold py-3 transition-colors border-b border-white/5"
                    >
                      {t(item.key)}
                    </Link>
                  ) : (
                    <a
                      key={item.key}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-base font-medium text-primary-foreground/90 hover:text-gold py-3 transition-colors border-b border-white/5"
                    >
                      {t(item.key)}
                    </a>
                  )
                ))}
                <div className="flex gap-3 pt-6">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setMobileOpen(false); }}
                      className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-all ${
                        lang === l.code
                          ? 'bg-gradient-gold text-oxford'
                          : 'bg-white/5 border border-gold/20 text-primary-foreground/70'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
