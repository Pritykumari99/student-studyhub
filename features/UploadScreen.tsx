
import React, { useState, useRef } from 'react';
import { GeminiService } from '../services/geminiService';
import { BackendService } from '../services/backendService';
import { GeneratedQuestion } from '../types';
import { Camera, Image as ImageIcon, Upload, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';

const UploadScreen: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setQuestions([]); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!image) return;
    setIsProcessing(true);
    try {
      const result = await GeminiService.generateQuestionsFromImage(image);
      setQuestions(result);
      // Save result to "backend"
      await BackendService.saveScanResult(result);
    } catch (err) {
      console.error(err);
      alert("Error generating questions. Please try a clearer image.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Question Generator</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Scan book pages to predict exam questions</p>
      </div>

      {!image ? (
        <div className="flex flex-col gap-4">
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-48 border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-3xl flex flex-col items-center justify-center gap-3 bg-white dark:bg-slate-800 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition group"
          >
            <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-2xl group-hover:bg-blue-100 dark:group-hover:bg-blue-800/50 transition">
              <Camera size={32} className="text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
            </div>
            <p className="text-sm font-bold text-gray-600 dark:text-gray-300">Take a photo of the page</p>
            <p className="text-xs text-gray-400 font-medium">Supports JPG, PNG</p>
          </button>
          <div className="text-center relative py-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-white/10"></div></div>
            <span className="relative bg-gray-50 dark:bg-slate-900 px-3 text-xs text-gray-400 uppercase font-bold">OR</span>
          </div>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="w-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-white/5 p-4 rounded-2xl flex items-center justify-center gap-3 font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition active:scale-95"
          >
            <ImageIcon size={20} className="text-blue-500 dark:text-blue-400" /> Pick from Gallery
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
        </div>
      ) : (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-300">
          <div className="relative rounded-3xl overflow-hidden shadow-lg aspect-[3/4] bg-black">
            <img src={image} alt="Preview" className="w-full h-full object-cover" />
            <button 
              onClick={() => { setImage(null); setQuestions([]); }}
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/40"
            >
              <Upload size={18} />
            </button>
          </div>

          {!questions.length && (
            <button 
              onClick={handleGenerate}
              disabled={isProcessing}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-blue-200 dark:shadow-none transition-all active:scale-95 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Loader2 size={20} className="animate-spin" /> Analyzing concepts...
                </>
              ) : (
                <>
                  <Sparkles size={20} /> Generate Questions
                </>
              )}
            </button>
          )}
        </div>
      )}

      {questions.length > 0 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-500">
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-bold mb-2">
            <CheckCircle2 size={20} />
            <h3>Generated Exam Questions</h3>
          </div>
          
          <div className="space-y-3">
            {questions.map((q, idx) => (
              <div key={q.id} className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-[10px] bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded-full font-bold uppercase">{q.type}</span>
                  <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500">{q.marks} Marks</span>
                </div>
                <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
                  <span className="text-blue-600 dark:text-blue-400 mr-2 font-bold">{idx + 1}.</span> {q.text}
                </p>
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => { setImage(null); setQuestions([]); }}
            className="w-full py-4 text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-2xl hover:bg-blue-100 dark:hover:bg-blue-900/40 transition"
          >
            Scan Another Page
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadScreen;
