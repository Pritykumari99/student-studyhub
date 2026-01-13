
import React from 'react';
import { subjects } from '../services/dataService';
import { Semester, Subject } from '../types';
import { Book, ChevronRight } from 'lucide-react';

interface SubjectScreenProps {
  semester: Semester;
  branchId: string;
  onSelect: (sub: Subject) => void;
}

const SubjectScreen: React.FC<SubjectScreenProps> = ({ semester, branchId, onSelect }) => {
  const semesterSubjects = subjects.filter(s => s.semesterId === semester.id && s.branchId === branchId);

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Subjects</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">{semester.name} Engineering</p>
      </div>

      {semesterSubjects.length > 0 ? (
        <div className="space-y-3">
          {semesterSubjects.map((sub) => (
            <button
              key={sub.id}
              onClick={() => onSelect(sub)}
              className="w-full p-4 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-between shadow-sm border border-black/5 dark:border-white/5 hover:border-blue-200 transition active:scale-[0.98]"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/10 rounded-xl text-blue-600 dark:text-blue-400">
                  <Book size={20} />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-gray-800 dark:text-white text-sm">{sub.title}</h4>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium tracking-widest">{sub.code}</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-gray-300 dark:text-gray-600" />
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 dark:text-gray-600 space-y-4">
          <Book size={48} className="opacity-20" />
          <p className="text-sm">No subjects found for this criteria.</p>
        </div>
      )}
    </div>
  );
};

export default SubjectScreen;
