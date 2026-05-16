import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';
import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="pt-24 pb-20 md:pt-32 md:pb-32 bg-background min-h-screen">
        
        {/* Header Section */}
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="text-gold font-semibold tracking-wider uppercase text-sm">
              About DOMOSIA
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-oxford mt-4 mb-6">
              Redefining Rental <br className="hidden md:block"/> Management in Morocco
            </h1>
            <div className="w-24 h-1 bg-gold mx-auto rounded-full"></div>
          </motion.div>
        </div>

        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl space-y-24">
          
          {/* Who We Are - Image Left, Text Right */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="w-full lg:w-1/2"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=2070&auto=format&fit=crop" 
                  alt="Luxurious Moroccan Interior" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-oxford/20 to-transparent"></div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="w-full lg:w-1/2 space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-oxford">Who We Are</h2>
              <p className="text-lg text-oxford-light leading-relaxed font-sans">
                We are a rental management company built by a team passionate about hospitality, real estate, and operational excellence. 
              </p>
              <p className="text-lg text-oxford-light leading-relaxed font-sans">
                The idea behind DOMOSIA was born from extensive experience in the hospitality sector in France, combined with our own experience as frequent Airbnb travelers with a strong appreciation for high standards, quality, and attention to detail. 
              </p>
              <p className="text-lg text-oxford-light leading-relaxed font-sans">
                This journey allowed us to develop a deep understanding of guest expectations, property performance, and the level of excellence required to create exceptional stays.
              </p>
            </motion.div>
          </div>

          {/* Our Mission - Text Left, Image Right */}
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="w-full lg:w-1/2 space-y-6"
            >
              <div className="inline-block px-4 py-1 bg-gold/10 rounded-full text-gold font-semibold text-sm mb-2">Our Core Purpose</div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-oxford">Our Mission</h2>
              <p className="text-lg text-oxford-light leading-relaxed font-sans">
                Our mission is to help property owners maximize the value and profitability of their assets through a fully managed, high-end rental experience. 
              </p>
              <p className="text-lg text-oxford-light leading-relaxed font-sans">
                We combine local market expertise with international hospitality standards to deliver seamless management, exceptional guest satisfaction, and complete peace of mind for owners.
              </p>
              <p className="text-lg text-oxford-light leading-relaxed font-sans">
                To ensure operational efficiency and consistency at scale, we have also developed industry-specific software designed to optimize and streamline every aspect of property management.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="w-full lg:w-1/2 relative"
            >
              {/* Decorative background element */}
              <div className="absolute -inset-4 bg-gold/10 rounded-[2rem] transform -rotate-3 z-0"></div>
              
              <div className="relative z-10 aspect-square rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop" 
                  alt="Modern Premium Interior" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>

          {/* Our Vision - Full Width with Parallax-like effect */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden mt-12"
          >
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?q=80&w=1974&auto=format&fit=crop" 
                alt="Moroccan Architecture" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-oxford/80 backdrop-blur-[2px]"></div>
            </div>
            
            <div className="relative z-10 p-10 md:p-16 lg:p-20 text-center max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">Our Vision</h2>
              <div className="w-16 h-1 bg-gold mx-auto rounded-full mb-8"></div>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-light italic">
                "To redefine short-term rental management in Morocco by building a trusted brand recognized for quality, transparency, and long-term value creation."
              </p>
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
