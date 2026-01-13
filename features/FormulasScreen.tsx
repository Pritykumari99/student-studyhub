
import React from 'react';
import { engineeringFormulas } from '../services/dataService';
import { Sigma } from 'lucide-react';

const FormulasScreen: React.FC = () => {
  return (
    <div className="p-6 space-y-6 animate-in slide-in-from-right duration-300">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Engineering Formulas</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Quick reference for major disciplines</p>
      </div>

      <div className="space-y-4">
        {engineeringFormulas.map((formula, idx) => (
          <div 
            key={idx}
            className="bg-white dark:bg-black rounded-3xl p-6 border border-gray-100 dark:border-white/10 shadow-sm space-y-3"
          >
            <div className="flex justify-between items-center">
              <span className="text-[10px] bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                {formula.category}
              </span>
              <Sigma size={16} className="text-gray-300 dark:text-gray-600" />
            </div>
            <h4 className="font-bold text-gray-800 dark:text-white">{formula.title}</h4>
            <div className="bg-gray-50 dark:bg-slate-900 p-4 rounded-xl flex items-center justify-center border dark:border-white/5">
              <code className="text-blue-600 dark:text-blue-400 font-mono text-sm lg:text-base font-bold text-center">
                {formula.expression}
              </code>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 italic">
              {formula.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormulasScreen;
