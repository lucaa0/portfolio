import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  isEditing: boolean;
  className?: string;
  multiline?: boolean;
  placeholder?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onChange,
  isEditing,
  className = '',
  multiline = false,
  placeholder = 'Clicca per modificare...',
  as: Component = 'p'
}) => {
  const [localValue, setLocalValue] = useState(value);
  const [isActive, setIsActive] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isActive]);

  const handleClick = () => {
    if (isEditing) {
      setIsActive(true);
    }
  };

  const handleBlur = () => {
    setIsActive(false);
    if (localValue !== value) {
      onChange(localValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleBlur();
    } else if (e.key === 'Escape') {
      setLocalValue(value);
      setIsActive(false);
    }
  };

  if (isEditing && isActive) {
    const InputComponent = multiline ? 'textarea' : 'input';
    return (
      <InputComponent
        ref={inputRef as any}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={cn(
          'bg-transparent border-2 border-dashed border-accent rounded px-2 py-1 outline-none resize-none',
          className
        )}
        placeholder={placeholder}
        rows={multiline ? 4 : undefined}
      />
    );
  }

  return (
    <Component
      onClick={handleClick}
      className={cn(
        className,
        isEditing && 'cursor-pointer hover:bg-accent/10 rounded px-2 py-1 border-2 border-transparent hover:border-accent/30 transition-all duration-200'
      )}
    >
      {value || (isEditing ? placeholder : '')}
    </Component>
  );
};