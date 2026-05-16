import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const AboutPage = () => {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      
      {/* Hero Header */}
      <div className="relative pt-32 pb-24 md:pt-48 md:pb-40 bg-oxford overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2070&auto=format&fit=crop" 
            alt="Luxury Villa" 
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-oxford/70"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 max-w-5xl text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-gold font-semibold tracking-widest uppercase text-xs md:text-sm mb-6 block"
          >
            {t('about.header.badge')}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-8 leading-tight"
            dangerouslySetInnerHTML={{ __html: t('about.header.title') }}
          />
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: '4rem' }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1 bg-gold mx-auto"
          ></motion.div>
        </div>
      </div>

      <div className="bg-background pb-24 pt-12 md:pb-32">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl space-y-24 md:space-y-32">
          
          {/* Who We Are - Clean Editorial Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 space-y-6"
            >
              <h2 className="text-sm font-semibold tracking-widest text-gold uppercase">{t('about.who.badge')}</h2>
              <h3 className="text-3xl md:text-4xl font-display font-bold text-oxford leading-tight">
                {t('about.who.title')}
              </h3>
              <div className="space-y-4 text-oxford/80 font-body leading-relaxed">
                <p>{t('about.who.p1')}</p>
                <p>{t('about.who.p2')}</p>
                <p>{t('about.who.p3')}</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7"
            >
              <div className="relative aspect-[4/3] overflow-hidden shadow-lg border border-gold/10">
                <img 
                  src="https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=2070&auto=format&fit=crop" 
                  alt="Luxurious Moroccan Interior" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </motion.div>
          </div>

          <div className="w-full border-t border-gold/20"></div>

          {/* Our Mission */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 order-2 lg:order-1"
            >
              <div className="relative aspect-square md:aspect-[4/3] overflow-hidden shadow-lg border border-gold/10">
                <img 
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop" 
                  alt="Premium Modern Interior" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6 order-1 lg:order-2 space-y-6"
            >
              <h2 className="text-sm font-semibold tracking-widest text-gold uppercase">{t('about.mission.badge')}</h2>
              <h3 className="text-3xl md:text-4xl font-display font-bold text-oxford leading-tight">
                {t('about.mission.title')}
              </h3>
              <div className="space-y-4 text-oxford/80 font-body leading-relaxed">
                <p>{t('about.mission.p1')}</p>
                <p>{t('about.mission.p2')}</p>
                <p>{t('about.mission.p3')}</p>
              </div>
            </motion.div>
          </div>

          {/* Our Vision */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="bg-oxford p-12 md:p-20 text-center relative overflow-hidden shadow-2xl"
          >
            {/* Subtle background texture/gradient */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold via-oxford to-oxford"></div>
            
            <div className="relative z-10 max-w-4xl mx-auto space-y-8">
              <h2 className="text-sm font-semibold tracking-widest text-gold uppercase">{t('about.vision.badge')}</h2>
              <p 
                className="text-2xl md:text-3xl lg:text-4xl text-white font-display font-light leading-snug"
                dangerouslySetInnerHTML={{ __html: t('about.vision.quote') }}
              />
            </div>
          </motion.div>

        </div>
      </div>
      <Footer />
      <FloatingContact />
    </>
  );
};

export default AboutPage;
