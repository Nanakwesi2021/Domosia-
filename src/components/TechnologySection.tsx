import { motion } from 'framer-motion';
import { KeyRound, Cpu, LayoutDashboard, DollarSign, ShieldCheck, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const TechnologySection = () => {
  const { t } = useLanguage();

  const techs = [
    { icon: KeyRound, titleKey: 'tech.smartAccess.title', descKey: 'tech.smartAccess.desc' },
    { icon: Cpu, titleKey: 'tech.automation.title', descKey: 'tech.automation.desc' },
    { icon: LayoutDashboard, titleKey: 'tech.dashboard.title', descKey: 'tech.dashboard.desc' },
    { icon: DollarSign, titleKey: 'tech.pricing.title', descKey: 'tech.pricing.desc' },
    { icon: ShieldCheck, titleKey: 'tech.payments.title', descKey: 'tech.payments.desc' },
    { icon: Globe, titleKey: 'tech.platforms.title', descKey: 'tech.platforms.desc' },
  ];

  return (
    <section id="technology" className="section-padding bg-background relative overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-body font-semibold tracking-[0.2em] uppercase text-gold mb-4 block">
            Innovation
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            {t('tech.title')}
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">
            {t('tech.subtitle')}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {techs.map((tech, i) => (
            <motion.div
              key={tech.titleKey}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="group relative bg-card rounded-xl p-6 shadow-card hover-lift border border-border/50 overflow-hidden"
            >
              {/* Subtle 3D depth effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-lg bg-oxford/5 flex items-center justify-center mb-5 group-hover:bg-gradient-gold transition-all duration-500">
                  <tech.icon className="w-6 h-6 text-gold group-hover:text-oxford icon-animated" />
                </div>
                <h3 className="text-lg font-display font-bold text-foreground mb-2">
                  {t(tech.titleKey)}
                </h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  {t(tech.descKey)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
