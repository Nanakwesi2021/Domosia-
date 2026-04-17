import { motion } from 'framer-motion';
import { Check, Crown, Monitor } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const OffersSection = () => {
  const { t } = useLanguage();

  const offers = [
  {
    icon: Crown,
    titleKey: 'offers.full.title',
    badgeKey: 'offers.full.badge',
    descKey: 'offers.full.desc',
    features: ['offers.full.f1', 'offers.full.f2', 'offers.full.f3', 'offers.full.f4', 'offers.full.f5'],
    ctaKey: 'offers.full.cta',
    featured: true
  },
  {
    icon: Monitor,
    titleKey: 'offers.digital.title',
    badgeKey: 'offers.digital.badge',
    descKey: 'offers.digital.desc',
    features: ['offers.digital.f1', 'offers.digital.f2', 'offers.digital.f3', 'offers.digital.f4'],
    ctaKey: 'offers.digital.cta',
    featured: false
  }];


  return (
    <section id="offers" className="section-padding bg-secondary/50 relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          
          <span className="text-sm font-body font-semibold tracking-[0.2em] uppercase text-gold mb-4 block">
            {t('nav.offers')}
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            {t('offers.title')}
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">
            {t('offers.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {offers.map((offer, i) =>
          <motion.div
            key={offer.titleKey}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className={`group relative rounded-2xl p-8 transition-all duration-500 hover-lift ${
            offer.featured ?
            'bg-oxford text-primary-foreground shadow-depth border border-gold/20 animate-glow-pulse' :
            'bg-card text-foreground shadow-card border border-border'}`
            }>
            
              {offer.featured &&
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  

              
                </div>
            }



              <div className="flex items-center gap-3 mb-4 mt-2">
                
                <h3 className="text-2xl font-display font-bold">{t(offer.titleKey)}</h3>
              </div>

              <p className={`text-sm font-body mb-6 leading-relaxed ${
            offer.featured ? 'text-primary-foreground/70' : 'text-muted-foreground'}`
            }>
                {t(offer.descKey)}
              </p>

              <ul className="space-y-3 mb-8">
                {offer.features.map((f) =>
              <li key={f} className="flex items-center gap-3 text-sm font-body">
                    <Check className={`w-4 h-4 flex-shrink-0 ${offer.featured ? 'text-gold' : 'text-gold'}`} />
                    <span className={offer.featured ? 'text-primary-foreground/80' : 'text-foreground/80'}>
                      {t(f)}
                    </span>
                  </li>
              )}
              </ul>

              <a
              href="#contact"
              className={`block text-center py-3 px-6 rounded-lg font-semibold font-body text-sm tracking-wide uppercase transition-all duration-300 ${
              offer.featured ?
              'bg-gradient-gold text-oxford hover:shadow-gold hover:scale-105' :
              'border-2 border-gold/40 text-foreground hover:border-gold hover:bg-gold/5'}`
              }>
              
                {t(offer.ctaKey)}
              </a>
            </motion.div>
          )}
        </div>

        {/* Digital-Only Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center">
          
          <div className="inline-block max-w-2xl bg-muted/60 border border-gold/15 rounded-xl p-6">
            <p className="text-muted-foreground font-body text-sm leading-relaxed">
              {t('how.digitalNote')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>);

};

export default OffersSection;