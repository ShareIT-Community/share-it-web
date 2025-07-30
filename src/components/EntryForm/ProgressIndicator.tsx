import React from 'react';

interface ProgressIndicatorProps {
  currentStage: 'personal' | 'confirmation';
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStage }) => {
  return (
    <div className="flex justify-center items-center gap-3 mb-6">
      <div
        className={`w-4 h-4 rounded-full transition-all duration-300 ${
          currentStage === 'personal' 
            ? 'bg-gradient-to-r from-[#4b6ef8] via-primary to-[#94e7f8]' 
            : 'bg-white/90'
        }`}
      />
      <div
        className={`w-4 h-4 rounded-full transition-all duration-300 ${
          currentStage === 'personal' 
            ? 'bg-white/90' 
            : 'bg-gradient-to-r from-[#4b6ef8] via-primary to-[#94e7f8]'
        }`}
      />
    </div>
  );
};