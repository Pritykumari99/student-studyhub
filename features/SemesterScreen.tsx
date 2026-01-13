
import React from 'react';
import { semesters } from '../services/dataService';
import { Semester } from '../types';

interface SemesterScreenProps {
  onSelect: (sem: Semester) => void;
}

const SemesterScreen: React.FC<SemesterScreenProps> = ({ onSelect }) => {
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Select Semester</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Pick your academic term</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {semesters.map((sem) => (
          <button
            key={sem.id}
            onClick={() => onSelect(sem)}
            className="p-8 rounded-3xl border-2 border-transparent bg-white dark:bg-slate-800 shadow-sm hover:border-blue-500 hover:text-blue-600 transition-all flex flex-col items-center gap-3 active:scale-95 group"
          >
            <span className="text-4xl font-black opacity-10 dark:opacity-20 leading-none group-hover:opacity-100 transition-opacity dark:text-white">{sem.id}</span>
            <span className="font-bold text-lg dark:text-white">{sem.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SemesterScreen;
