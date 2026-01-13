
import React from 'react';
import { AppView } from '../types';
import { BookOpen, Sparkles, Camera, ArrowRight, Zap, GraduationCap, Library } from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (view: AppView) => void;
  userName: string;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, userName }) => {
  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-white tracking-tight">Hi, {userName.split(' ')[0]}! 👋</h2>
          <p className="text-gray-400 text-sm font-medium">Elevate your engineering journey.</p>
        </div>
        <div className="p-2 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20">
          <GraduationCap className="text-[#D4AF37]" size={24} />
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-900 to-black rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden border border-white/5">
        <div className="relative z-10 space-y-5">
          <div className="bg-[#D4AF37] inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black text-black tracking-widest uppercase">
            <Zap size={12} /> AI POWERED
          </div>
          <h3 className="text-2xl font-bold leading-tight tracking-tight">Predict Your Next Exam Questions</h3>
          <p className="text-white/60 text-xs font-medium leading-relaxed">Simply upload a page from your notes, and our AI Professor will generate likely exam questions instantly.</p>
          <button 
            onClick={() => onNavigate(AppView.UPLOAD)}
            className="bg-[#D4AF37] text-black px-6 py-3 rounded-2xl text-xs font-black flex items-center gap-2 shadow-xl hover:bg-[#B8962D] transition-all transform active:scale-95 uppercase tracking-widest"
          >
            Start Scanning <ArrowRight size={14} />
          </button>
        </div>
        {/* Abstract Deco */}
        <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-[#D4AF37]/10 blur-[80px] rounded-full"></div>
        <Sparkles className="absolute -bottom-6 -right-6 w-32 h-32 text-white/5 rotate-12" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ActionCard 
          icon={<BookOpen className="text-blue-500" />} 
          title="Study Notes" 
          subtitle="Branch wise content" 
          onClick={() => onNavigate(AppView.BRANCHES)}
          color="bg-blue-900/10"
        />
        <ActionCard 
          icon={<Library className="text-green-500" />} 
          title="E-Books" 
          subtitle="Textbook Library" 
          onClick={() => onNavigate(AppView.BOOKS)}
          color="bg-green-900/10"
        />
        <ActionCard 
          icon={<Sparkles className="text-purple-500" />} 
          title="AI Tutor" 
          subtitle="Real-time solutions" 
          onClick={() => onNavigate(AppView.CHAT)}
          color="bg-purple-900/10"
        />
        <ActionCard 
          icon={<Camera className="text-[#D4AF37]" />} 
          title="Exam Predictor" 
          subtitle="Notebook to Questions" 
          onClick={() => onNavigate(AppView.UPLOAD)}
          color="bg-[#D4AF37]/10"
        />
      </div>

      <div className="bg-slate-900/50 p-6 rounded-[2rem] border border-white/5">
        <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">Quick Links</h4>
        <div className="space-y-3">
          <button 
            onClick={() => onNavigate(AppView.FORMULAS)}
            className="w-full flex items-center justify-between text-left p-3 rounded-xl hover:bg-slate-800 transition"
          >
            <span className="text-sm font-bold text-gray-200">Engineering Formula Guide</span>
            <ArrowRight size={14} className="text-gray-600" />
          </button>
          <button 
            onClick={() => onNavigate(AppView.PAPERS)}
            className="w-full flex items-center justify-between text-left p-3 rounded-xl hover:bg-slate-800 transition"
          >
            <span className="text-sm font-bold text-gray-200">Previous Year Papers</span>
            <ArrowRight size={14} className="text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

const ActionCard: React.FC<{ icon: React.ReactNode; title: string; subtitle: string; onClick: () => void; color: string; className?: string }> = ({ icon, title, subtitle, onClick, color, className = "" }) => (
  <button 
    onClick={onClick}
    className={`${className} ${color} p-6 rounded-[2rem] flex flex-col items-start gap-4 transition-all active:scale-95 shadow-sm border border-white/5 text-left group hover:shadow-xl hover:translate-y-[-2px]`}
  >
    <div className="p-3 bg-slate-800 rounded-2xl shadow-sm transition-transform group-hover:scale-110">
      {icon}
    </div>
    <div>
      <h4 className="font-bold text-gray-100 tracking-tight">{title}</h4>
      <p className="text-[10px] text-gray-400 font-medium">{subtitle}</p>
    </div>
  </button>
);

export default HomeScreen;
