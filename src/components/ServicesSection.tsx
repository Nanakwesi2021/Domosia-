import { motion } from 'framer-motion';
import { Users, TrendingUp, BarChart3 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ServicesSection = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Users,
      titleKey: 'services.fullMgmt.title',
      descKey: 'services.fullMgmt.desc',
    },
    {
      icon: TrendingUp,
      titleKey: 'services.marketing.title',
      descKey: 'services.marketing.desc',
    },
    {
      icon: BarChart3,
      titleKey: 'services.reporting.title',
      descKey: 'services.reporting.desc',
    },
  ];

  return (
    <section id="services" className="section-padding bg-background relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-body font-semibold tracking-[0.2em] uppercase text-gold mb-4 block">
            {t('nav.services')}
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            {t('services.title')}
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.titleKey}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group bg-card rounded-xl p-8 shadow-card hover-lift border border-border/50"
            >
              <div className="w-16 h-16 rounded-xl bg-oxford/5 flex items-center justify-center mb-6 group-hover:bg-gradient-gold transition-all duration-500">
                <service.icon className="w-7 h-7 text-gold group-hover:text-oxford icon-animated" />
              </div>
              <h3 className="text-xl font-display font-bold text-foreground mb-3">
                {t(service.titleKey)}
              </h3>
              <p className="text-muted-foreground font-body leading-relaxed text-sm">
                {t(service.descKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
