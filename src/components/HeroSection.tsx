import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import FormModal from './FormModal';

const HeroSection = () => {
  const { t } = useLanguage();
  const [formOpen, setFormOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat parallax-bg"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }} />

      {/* Overlay */}
      <div className="absolute inset-0 bg-hero-overlay" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-gold/20 rounded-full animate-float opacity-30" />
      <div className="absolute bottom-32 right-16 w-20 h-20 border border-gold/15 rounded-full animate-float" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}>

          <div className="inline-block mb-6">
            


          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6 text-primary-foreground whitespace-pre-line">
            {t('hero.headline').split(',').map((part, i) =>
              <span key={i}>
                {i === 0 ?
                  <span className="text-gradient-gold">{part}</span> :
                  <span>{i === 1 ? `\n${part.trim()}` : `,${part}`}</span>
                }
              </span>
            )}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl font-body text-primary-foreground/75 max-w-2xl mx-auto mb-10 leading-relaxed">

            {t('hero.subtext')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center">

            <button
              onClick={() => navigate('/simulator')}
              className="px-8 py-4 bg-gradient-gold text-oxford font-semibold font-body rounded-lg hover:shadow-gold transition-all duration-300 hover:scale-105 text-sm tracking-wide uppercase">
              {t('hero.cta1')}
            </button>
            <a
              href="#services"
              className="px-8 py-4 border-2 border-gold/40 text-primary-foreground font-semibold font-body rounded-lg hover:border-gold hover:bg-gold/10 transition-all duration-300 text-sm tracking-wide uppercase">

              {t('hero.cta2')}
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2">

        <div className="w-6 h-10 rounded-full border-2 border-gold/40 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-3 bg-gold/60 rounded-full" />
        </div>
      </motion.div>
      <FormModal open={formOpen} onOpenChange={setFormOpen} />
    </section>);

};

export default HeroSection;