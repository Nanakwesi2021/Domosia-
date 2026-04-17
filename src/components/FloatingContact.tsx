import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Phone, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const FloatingContact = () => {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="flex flex-col gap-3 mb-2"
          >
            <a
              href="https://wa.me/212777237983"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-card shadow-card-hover rounded-full px-5 py-3 hover:scale-105 transition-transform"
            >
              <Phone size={18} className="text-gold" />
              <span className="text-sm font-body font-medium text-foreground">{t('float.whatsapp')}</span>
            </a>
            <a
              href="mailto:hello@domosia.ma"
              className="flex items-center gap-3 bg-card shadow-card-hover rounded-full px-5 py-3 hover:scale-105 transition-transform"
            >
              <Mail size={18} className="text-gold" />
              <span className="text-sm font-body font-medium text-foreground">{t('float.email')}</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-gradient-gold shadow-gold flex items-center justify-center hover:scale-110 transition-transform duration-300"
      >
        {open ? <X size={22} className="text-oxford" /> : <MessageCircle size={22} className="text-oxford" />}
      </button>
    </div>
  );
};

export default FloatingContact;
