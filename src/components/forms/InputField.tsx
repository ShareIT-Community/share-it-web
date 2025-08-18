import React from 'react';

type Props = {
  label: string;
  error?: string;
  children: React.ReactNode;
};
//llamar al controller y como prop paso el control
export const InputField = ({ label, error, children }: Props) => (
  <div className="flex flex-col items-start gap-1 mb-2">
    <label className="font-medium text-white text-left">{label}</label>
    {children}
    {error && <span className="text-red-500 text-sm">{error}</span>}
  </div>
);