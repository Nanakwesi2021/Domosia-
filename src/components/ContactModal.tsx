import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { CheckCircle2 } from 'lucide-react';

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContactModal = ({ open, onOpenChange }: ContactModalProps) => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    setTimeout(() => {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onOpenChange(false);
      }, 3000);
    }, 500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] border-gold/20 bg-[#faf8f5]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display font-bold text-oxford">
            {t('nav.contact')}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground font-body">
            {t('contact.intro')}
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
            <h3 className="text-xl font-display font-semibold text-oxford">Message Sent!</h3>
            <p className="text-muted-foreground font-body">We will get back to you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-semibold">{t('contact.fullName')} *</Label>
              <Input id="name" required placeholder={t('contact.fullNamePlaceholder')} className="border-gold/20 focus:border-gold" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold">{t('contact.email')} *</Label>
              <Input id="email" type="email" required placeholder={t('contact.emailPlaceholder')} className="border-gold/20 focus:border-gold" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-semibold">{t('contact.phone')} *</Label>
              <Input id="phone" type="tel" required placeholder={t('contact.phonePlaceholder')} className="border-gold/20 focus:border-gold" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-semibold">Message</Label>
              <Textarea id="message" rows={4} className="border-gold/20 focus:border-gold resize-none" placeholder="How can we help you?" />
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full bg-oxford text-white hover:bg-oxford/90 hover:shadow-lg transition-all">
                Send Message
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
