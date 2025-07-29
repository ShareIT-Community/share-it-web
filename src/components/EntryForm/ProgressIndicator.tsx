import React from 'react';

interface ProgressIndicatorProps {
  currentStage: 'personal' | 'confirmation';
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStage }) => {
  return (
    <div className="flex justify-center items-center gap-3 mb-6">
      <div
        className={`w-4 h-4 rounded-full transition-colors duration-300 ${
          currentStage === 'personal' 
            ? 'bg-blue-500' 
            : 'bg-green-500'
        }`}
      />
      <div
        className={`w-4 h-4 rounded-full transition-colors duration-300 ${
          currentStage === 'personal' 
            ? 'bg-gray-400' 
            : 'bg-blue-500'
        }`}
      />
    </div>
  );
}; 