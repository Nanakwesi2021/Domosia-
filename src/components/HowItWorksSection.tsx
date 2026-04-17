import { motion } from 'framer-motion';
import { Wrench, Rocket, Settings } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const HowItWorksSection = () => {
  const { t } = useLanguage();

  const steps = [
    { num: '01', icon: Wrench, titleKey: 'how.step1.title', descKey: 'how.step1.desc' },
    { num: '02', icon: Rocket, titleKey: 'how.step2.title', descKey: 'how.step2.desc' },
    { num: '03', icon: Settings, titleKey: 'how.step3.title', descKey: 'how.step3.desc' },
  ];

  return (
    <section id="how-it-works" className="section-padding bg-oxford relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, hsl(51 100% 50%) 1px, transparent 0)',
        backgroundSize: '40px 40px',
      }} />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-body font-semibold tracking-[0.2em] uppercase text-gold mb-4 block">
            Process
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-primary-foreground mb-4">
            {t('how.title')}
          </h2>
          <p className="text-primary-foreground/60 font-body max-w-xl mx-auto">
            {t('how.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-24 left-[16.6%] right-[16.6%] h-[2px] bg-gradient-to-r from-gold/0 via-gold/40 to-gold/0" />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative text-center group"
            >
              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-oxford-light border-2 border-gold/30 mb-6 group-hover:border-gold group-hover:shadow-gold transition-all duration-500">
                <step.icon className="w-8 h-8 text-gold icon-animated" />
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-gold text-oxford text-xs font-bold flex items-center justify-center font-body">
                  {step.num}
                </span>
              </div>
              <h3 className="text-xl font-display font-bold text-primary-foreground mb-3">
                {t(step.titleKey)}
              </h3>
              <p className="text-primary-foreground/60 font-body text-sm leading-relaxed max-w-xs mx-auto">
                {t(step.descKey)}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorksSection;
