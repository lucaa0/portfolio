import { useState, useEffect } from 'react';

const EDIT_PIN = '0803'; // In produzione, questo dovrebbe essere configurabile
const EDIT_MODE_KEY = 'portfolio_edit_mode';

export const useEditMode = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);

  useEffect(() => {
    // Controlla se la modalità edit era attiva
    const saved = localStorage.getItem(EDIT_MODE_KEY);
    if (saved === 'true') {
      setIsEditMode(true);
    }
  }, []);

  const enterEditMode = (pin: string) => {
    if (pin === EDIT_PIN) {
      setIsEditMode(true);
      localStorage.setItem(EDIT_MODE_KEY, 'true');
      setShowPinModal(false);
      return true;
    }
    return false;
  };

  const exitEditMode = () => {
    setIsEditMode(false);
    localStorage.removeItem(EDIT_MODE_KEY);
  };

  const togglePinModal = () => {
    setShowPinModal(!showPinModal);
  };

  return {
    isEditMode,
    showPinModal,
    enterEditMode,
    exitEditMode,
    togglePinModal
  };
};