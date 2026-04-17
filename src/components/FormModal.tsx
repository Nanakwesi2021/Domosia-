import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import SimulatorView from '@/simulator/SimulatorView';

interface FormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FormModal = ({ open, onOpenChange }: FormModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[95vw] h-[90vh] p-0 overflow-hidden border-gold/20 bg-[#faf8f5]">
        <DialogTitle className="sr-only">Contact Form</DialogTitle>
        <SimulatorView />
      </DialogContent>
    </Dialog>
  );
};

export default FormModal;
