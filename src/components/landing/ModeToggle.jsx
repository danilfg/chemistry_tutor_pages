import React from 'react';
import { useMode } from './ModeContext';
import { GraduationCap, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ModeToggle() {
  const { mode, setMode } = useMode();

  return (
    <div className="inline-flex items-center bg-card rounded-full p-1 shadow-md border border-border whitespace-nowrap flex-shrink-0">
      <button
        onClick={() => setMode('student')}
        className="relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-body font-medium transition-colors duration-300"
      >
        {mode === 'student' && (
          <motion.div
            layoutId="mode-bg"
            className="absolute inset-0 bg-primary rounded-full"
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
        <span className={`relative z-10 flex items-center gap-2 ${mode === 'student' ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
          <GraduationCap className="w-4 h-4" />
          Я школьник
        </span>
      </button>
      <button
        onClick={() => setMode('parent')}
        className="relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-body font-medium transition-colors duration-300"
      >
        {mode === 'parent' && (
          <motion.div
            layoutId="mode-bg"
            className="absolute inset-0 bg-primary rounded-full"
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
        <span className={`relative z-10 flex items-center gap-2 ${mode === 'parent' ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
          <Users className="w-4 h-4" />
          Я родитель
        </span>
      </button>
    </div>
  );
}