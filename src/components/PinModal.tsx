import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (pin: string) => boolean;
}

export const PinModal: React.FC<PinModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onSubmit(pin);
    if (success) {
      setPin('');
      setError('');
    } else {
      setError('PIN non corretto');
      setPin('');
    }
  };

  const handleClose = () => {
    setPin('');
    setError('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Modalità Editing</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pin">Inserisci il PIN per abilitare la modifica</Label>
            <Input
              id="pin"
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="PIN"
              className="text-center"
              maxLength={10}
            />
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
              Annulla
            </Button>
            <Button type="submit" className="flex-1">
              Conferma
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};