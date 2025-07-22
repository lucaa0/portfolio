import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings, Eye, Save } from 'lucide-react';

interface EditModeControlsProps {
  isEditMode: boolean;
  onToggleEditMode: () => void;
  onExitEditMode: () => void;
  onSave?: () => void;
}

export const EditModeControls: React.FC<EditModeControlsProps> = ({
  isEditMode,
  onToggleEditMode,
  onExitEditMode,
  onSave
}) => {
  if (!isEditMode) {
    return (
      <Button
        onClick={onToggleEditMode}
        variant="outline"
        size="sm"
        className="fixed bottom-4 right-4 z-50 shadow-lg hover:shadow-accent"
      >
        <Settings className="w-4 h-4" />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex gap-2">
      {onSave && (
        <Button
          onClick={onSave}
          size="sm"
          className="shadow-lg bg-accent hover:bg-accent/90"
        >
          <Save className="w-4 h-4 mr-2" />
          Salva
        </Button>
      )}
      <Button
        onClick={onExitEditMode}
        variant="outline"
        size="sm"
        className="shadow-lg"
      >
        <Eye className="w-4 h-4 mr-2" />
        Esci
      </Button>
    </div>
  );
};