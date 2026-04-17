import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import FormModal from './FormModal';

const CTASection = () => {
  const { t } = useLanguage();
  const [formOpen, setFormOpen] = useState(false);

  return (
    <section id="contact" className="relative section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-oxford" />
      <div
        className="absolute inset-0 opacity-10 parallax-bg"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-oxford/90" />

      <div className="relative z-10 container mx-auto text-center max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-block w-16 h-[2px] bg-gradient-gold mb-8" />
          <h2 className="text-3xl md:text-5xl font-display font-bold text-primary-foreground mb-6 leading-tight">
            {t('cta.title')}
          </h2>
          <p className="text-primary-foreground/60 font-body text-lg mb-10 max-w-xl mx-auto">
            {t('cta.subtitle')}
          </p>

          <div className="flex justify-center">
            <button
              onClick={() => setFormOpen(true)}
              className="px-8 py-4 bg-gradient-gold text-oxford font-semibold font-body rounded-lg hover:shadow-gold transition-all duration-300 hover:scale-105 text-sm tracking-wide uppercase"
            >
              {t('cta.audit')}
            </button>
          </div>
          <FormModal open={formOpen} onOpenChange={setFormOpen} />
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
