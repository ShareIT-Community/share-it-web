import React from "react";

const HelloFromReact: React.FC = () => {
  return (
    <div className="p-6 bg-indigo-100 text-white rounded-lg text-center shadow-md mb-6">
      <h2 className="text-2xl font-bold text-indigo-700 mb-2">¡Hola desde un componente React!</h2>
      <p className="text-indigo-900">Este componente está renderizado dentro de Astro y usa Tailwind CSS.</p>
    </div>
  );
};

export default HelloFromReact; 