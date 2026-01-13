
import React from 'react';
import { branches } from '../services/dataService';
import { Branch } from '../types';

interface BranchScreenProps {
  onSelect: (branch: Branch) => void;
}

const BranchScreen: React.FC<BranchScreenProps> = ({ onSelect }) => {
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Select Branch</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Which engineering discipline are you in?</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {branches.map((branch) => (
          <button
            key={branch.id}
            onClick={() => onSelect(branch)}
            className="p-6 rounded-3xl bg-white dark:bg-slate-800 shadow-sm border border-black/5 dark:border-white/5 hover:border-blue-500 transition-all flex flex-col items-center gap-4 active:scale-95"
          >
            <span className="text-4xl">{branch.icon}</span>
            <span className="font-bold text-sm text-center text-gray-800 dark:text-white leading-tight">
              {branch.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BranchScreen;
