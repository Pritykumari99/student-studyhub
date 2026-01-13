
import React from 'react';
import { previousPapers } from '../services/dataService';
import { Download, FileText } from 'lucide-react';

const PapersScreen: React.FC = () => {
  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 space-y-6 animate-in slide-in-from-right duration-300">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Previous Year Papers</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Past exams to boost your preparation</p>
      </div>

      <div className="space-y-3">
        {previousPapers.map((paper) => (
          <div 
            key={paper.id}
            className="bg-white dark:bg-black p-4 rounded-2xl flex items-center justify-between border border-gray-100 dark:border-white/10 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-xl text-red-600 dark:text-red-400">
                <FileText size={20} />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-gray-800 dark:text-white text-sm">{paper.subject}</h4>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest">{paper.year} Examination</p>
              </div>
            </div>
            <button 
              onClick={() => handleDownload(paper.url, `${paper.subject}_${paper.year}.pdf`)}
              className="p-2.5 bg-gray-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition active:scale-90"
            >
              <Download size={18} />
            </button>
          </div>
        ))}
      </div>
      
      <div className="bg-yellow-50 dark:bg-yellow-900/10 p-4 rounded-2xl border border-yellow-100 dark:border-yellow-900/20">
        <p className="text-[10px] text-yellow-700 dark:text-yellow-400 font-bold uppercase text-center">
          More papers are uploaded weekly!
        </p>
      </div>
    </div>
  );
};

export default PapersScreen;
