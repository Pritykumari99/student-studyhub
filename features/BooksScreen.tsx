
import React, { useState } from 'react';
import { engineeringBooks } from '../services/dataService';
import { EngineeringBook } from '../types';
import { Library, Search, Download, FileText, X, ExternalLink } from 'lucide-react';

const BooksScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState<EngineeringBook | null>(null);

  const filteredBooks = engineeringBooks.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 animate-in slide-in-from-right duration-300 pb-24">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-white">E-Book Library</h2>
        <p className="text-sm text-gray-400">Standard textbooks for engineering</p>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
        <input 
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-900 text-white rounded-2xl py-3.5 pl-12 pr-4 border border-white/10 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {filteredBooks.map((book) => (
          <div 
            key={book.id}
            onClick={() => setSelectedBook(book)}
            className="bg-slate-900 rounded-3xl overflow-hidden border border-white/5 shadow-lg active:scale-95 transition-transform group"
          >
            <div className={`h-32 ${book.coverColor} flex items-center justify-center relative overflow-hidden`}>
              <Library size={48} className="text-white/20 transform group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            <div className="p-4 space-y-1">
              <h4 className="font-bold text-white text-xs leading-tight line-clamp-2">{book.title}</h4>
              <p className="text-[10px] text-gray-500 font-medium truncate">{book.author}</p>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-[8px] font-black uppercase tracking-tighter bg-white/10 px-1.5 py-0.5 rounded text-gray-300">
                  {book.branchId}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-20 text-gray-500 space-y-2">
          <Library className="mx-auto opacity-10" size={64} />
          <p className="text-sm">No books found matching your search.</p>
        </div>
      )}

      {/* Book Viewer Modal */}
      {selectedBook && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex flex-col animate-in fade-in zoom-in-95 duration-200">
          <div className="bg-black p-4 flex items-center justify-between border-b border-white/10">
            <h3 className="font-bold text-sm truncate text-white">{selectedBook.title}</h3>
            <button 
              onClick={() => setSelectedBook(null)}
              className="p-1 hover:bg-white/10 rounded-full transition text-white"
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 bg-black flex items-center justify-center relative overflow-hidden">
            <div className="w-[85%] h-[75%] bg-slate-900 shadow-2xl flex flex-col p-8 space-y-6 animate-pulse border border-white/5">
              <div className="h-10 bg-slate-800 rounded w-1/2"></div>
              <div className="space-y-3">
                <div className="h-4 bg-slate-800 rounded w-full"></div>
                <div className="h-4 bg-slate-800 rounded w-full"></div>
                <div className="h-4 bg-slate-800 rounded w-3/4"></div>
              </div>
              <div className="h-40 bg-slate-800/50 rounded w-full"></div>
              <div className="space-y-3">
                <div className="h-4 bg-slate-800 rounded w-full"></div>
                <div className="h-4 bg-slate-800 rounded w-5/6"></div>
              </div>
            </div>
            <div className="absolute bottom-10">
               <span className="bg-white/10 text-white px-5 py-2.5 rounded-full text-xs backdrop-blur-md border border-white/10">
                 Loading Book Content...
               </span>
            </div>
          </div>
          <div className="bg-black p-6 border-t border-white/10 flex flex-col gap-4">
             <a 
              href={selectedBook.pdfUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-black text-center py-3.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 active:scale-95 transition"
             >
               Open Full PDF <ExternalLink size={16} />
             </a>
             <button className="text-gray-400 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
               <Download size={14} /> Download for Offline
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BooksScreen;
