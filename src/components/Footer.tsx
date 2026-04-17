import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Instagram } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const quickLinks = [
    { key: 'nav.services', href: isHome ? '#services' : '/#services' },
    { key: 'nav.howItWorks', href: isHome ? '#how-it-works' : '/#how-it-works' },
    { key: 'nav.offers', href: isHome ? '#offers' : '/#offers' },
    { key: 'nav.technology', href: isHome ? '#technology' : '/#technology' },
    { key: 'nav.simulator', href: '/simulator', isRoute: true },
  ];

  return (
    <footer className="bg-oxford border-t border-gold/10">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <span className="font-display text-2xl font-bold text-primary-foreground">
              DOMO<span className="text-gold">SIA</span>
            </span>
            <p className="mt-3 text-primary-foreground/50 font-body text-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-primary-foreground mb-4 text-sm uppercase tracking-wider">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((item) =>
                <li key={item.key}>
                  {item.isRoute ? (
                    <Link to={item.href} className="text-primary-foreground/50 hover:text-gold font-body text-sm transition-colors">
                      {t(item.key)}
                    </Link>
                  ) : (
                    <a href={item.href} className="text-primary-foreground/50 hover:text-gold font-body text-sm transition-colors">
                      {t(item.key)}
                    </a>
                  )}
                </li>
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-primary-foreground mb-4 text-sm uppercase tracking-wider">
              {t('footer.contact')}
            </h4>
            <ul className="space-y-2 text-primary-foreground/50 font-body text-sm">
              <li>hello@domosia.ma</li>
              <li>+212 777 237 983</li>
              <li>Rabat, Morocco</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display font-bold text-primary-foreground mb-4 text-sm uppercase tracking-wider">
              {t('footer.followUs')}
            </h4>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/d_o_m_o_s_i_a"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center text-primary-foreground/50 hover:bg-gold hover:text-oxford hover:border-gold transition-all duration-300"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gold/10 text-center">
          <p className="text-primary-foreground/30 font-body text-sm">{t('footer.rights')}</p>
        </div>
      </div>
    </footer>);

};

export default Footer;