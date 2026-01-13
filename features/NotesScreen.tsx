
import React, { useState } from 'react';
import { getNoteUnits } from '../services/dataService';
import { Subject, NoteUnit } from '../types';
import { FileText, Download, ExternalLink, X } from 'lucide-react';

interface NotesScreenProps {
  subject: Subject;
}

const NotesScreen: React.FC<NotesScreenProps> = ({ subject }) => {
  const units = getNoteUnits(subject.id);
  const [selectedUnit, setSelectedUnit] = useState<NoteUnit | null>(null);

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">{subject.title}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Resource Materials & Notes</p>
      </div>

      <div className="space-y-4">
        {units.map((unit) => (
          <div 
            key={unit.id}
            className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-black/5 dark:border-white/5 shadow-sm space-y-4"
          >
            <div className="flex justify-between items-start">
              <h4 className="font-bold text-gray-800 dark:text-white max-w-[80%]">{unit.title}</h4>
              <span className="text-[10px] bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full font-bold uppercase">PDF</span>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => setSelectedUnit(unit)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition"
              >
                <FileText size={14} /> View Notes
              </button>
              <button className="p-2.5 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-slate-600 transition">
                <Download size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PDF Viewer Mock Modal */}
      {selectedUnit && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex flex-col animate-in fade-in zoom-in duration-200">
          <div className="bg-white dark:bg-slate-800 p-4 flex items-center justify-between">
            <h3 className="font-bold text-sm truncate dark:text-white">{selectedUnit.title}</h3>
            <button 
              onClick={() => setSelectedUnit(null)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition dark:text-white"
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 bg-gray-200 dark:bg-slate-900 flex items-center justify-center relative">
            <div className="w-[90%] h-[80%] bg-white dark:bg-slate-800 shadow-2xl flex flex-col p-8 space-y-4 animate-pulse">
              <div className="h-8 bg-gray-100 dark:bg-slate-700 rounded w-1/3"></div>
              <div className="h-4 bg-gray-100 dark:bg-slate-700 rounded w-full"></div>
              <div className="h-4 bg-gray-100 dark:bg-slate-700 rounded w-full"></div>
              <div className="h-4 bg-gray-100 dark:bg-slate-700 rounded w-5/6"></div>
              <div className="h-4 bg-gray-100 dark:bg-slate-700 rounded w-full"></div>
              <div className="h-32 bg-gray-50 dark:bg-slate-700/50 rounded w-full"></div>
            </div>
            <div className="absolute bottom-10 flex gap-4">
               <span className="bg-black/50 text-white px-4 py-2 rounded-full text-xs backdrop-blur-md">
                 Page 1 of 12
               </span>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-4 border-t dark:border-white/5 flex justify-center">
             <a 
              href={selectedUnit.pdfUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 text-xs font-bold flex items-center gap-1"
             >
               Open in External Browser <ExternalLink size={14} />
             </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesScreen;
