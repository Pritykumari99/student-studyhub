
import React, { useState, useEffect } from 'react';
import { AppView, Semester, Subject, Branch } from './types';
import LoginScreen from './features/LoginScreen';
import HomeScreen from './features/HomeScreen';
import BranchScreen from './features/BranchScreen';
import SemesterScreen from './features/SemesterScreen';
import SubjectScreen from './features/SubjectScreen';
import NotesScreen from './features/NotesScreen';
import ChatScreen from './features/ChatScreen';
import UploadScreen from './features/UploadScreen';
import ProfileScreen from './features/ProfileScreen';
import FormulasScreen from './features/FormulasScreen';
import PapersScreen from './features/PapersScreen';
import BooksScreen from './features/BooksScreen';
import { BackendService } from './services/backendService';
import { ChevronLeft, Home, MessageCircle, FileText, User } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.LOGIN);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<Semester | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [user, setUser] = useState<{ name: string; email: string; avatar?: string } | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  // Initialize app from "Backend"
  useEffect(() => {
    const init = async () => {
      const savedUser = await BackendService.getCurrentUser();
      if (savedUser) {
        setUser(savedUser);
        setView(AppView.HOME);
      }
      setIsInitializing(false);
    };
    init();
  }, []);

  const navigateTo = (newView: AppView) => {
    setView(newView);
    window.scrollTo(0, 0);
  };

  const handleLogout = async () => {
    await BackendService.logout();
    setUser(null);
    setView(AppView.LOGIN);
  };

  const handleLogin = async (name: string, email: string) => {
    const loggedUser = await BackendService.login(name, email);
    setUser(loggedUser);
    setView(AppView.HOME);
  };

  const handleUpdateAvatar = async (newAvatar: string) => {
    if (user) {
      const updated = await BackendService.updateProfile({ avatar: newAvatar });
      if (updated) setUser(updated);
    }
  };

  if (isInitializing) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-white text-blue-600 font-bold text-2xl animate-pulse">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor" className="mb-4">
          <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
          <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
        </svg>
        Student StudyHub
      </div>
    );
  }

  if (view === AppView.LOGIN) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (view) {
      case AppView.HOME:
        return <HomeScreen onNavigate={navigateTo} userName={user?.name || "Student"} />;
      case AppView.BRANCHES:
        return <BranchScreen onSelect={(branch) => {
          setSelectedBranch(branch);
          setView(AppView.SEMESTERS);
        }} />;
      case AppView.SEMESTERS:
        return <SemesterScreen onSelect={(sem) => {
          setSelectedSemester(sem);
          setView(AppView.SUBJECTS);
        }} />;
      case AppView.SUBJECTS:
        return <SubjectScreen 
          semester={selectedSemester!} 
          branchId={selectedBranch?.id || ''}
          onSelect={(sub) => {
            setSelectedSubject(sub);
            setView(AppView.NOTES);
          }} 
        />;
      case AppView.NOTES:
        return <NotesScreen subject={selectedSubject!} />;
      case AppView.CHAT:
        return <ChatScreen />;
      case AppView.UPLOAD:
        return <UploadScreen />;
      case AppView.FORMULAS:
        return <FormulasScreen />;
      case AppView.PAPERS:
        return <PapersScreen />;
      case AppView.BOOKS:
        return <BooksScreen />;
      case AppView.PROFILE:
        return <ProfileScreen 
          user={user!} 
          onLogout={handleLogout} 
          onUpdateAvatar={handleUpdateAvatar}
        />;
      default:
        return <HomeScreen onNavigate={navigateTo} userName={user?.name || "Student"} />;
    }
  };

  return (
    <div className="h-screen bg-slate-100 flex items-center justify-center">
      <div className="flex flex-col h-full w-full max-w-md mx-auto bg-white shadow-xl overflow-hidden relative">
        {/* Header */}
        <header className="bg-blue-600 text-white p-4 flex items-center justify-between sticky top-0 z-50 shadow-md">
          <div className="flex items-center gap-3">
            {view !== AppView.HOME && view !== AppView.PROFILE && (
              <button 
                onClick={() => {
                  if (view === AppView.NOTES) setView(AppView.SUBJECTS);
                  else if (view === AppView.SUBJECTS) setView(AppView.SEMESTERS);
                  else if (view === AppView.SEMESTERS) setView(AppView.BRANCHES);
                  else setView(AppView.HOME);
                }}
                className="p-1 hover:bg-white/10 rounded-full transition"
              >
                <ChevronLeft size={24} />
              </button>
            )}
            <h1 className="text-xl font-bold tracking-tight">
              {view === AppView.HOME ? 'Student StudyHub' : view.charAt(0) + view.slice(1).toLowerCase().replace('_', ' ')}
            </h1>
          </div>
          <button 
            onClick={() => setView(AppView.PROFILE)}
            className={`w-10 h-10 rounded-full bg-blue-500 border-2 flex items-center justify-center text-xs font-bold transition-all overflow-hidden ${view === AppView.PROFILE ? 'border-white scale-110 shadow-lg' : 'border-white/20'}`}
          >
            {user?.avatar ? (
              <img src={user.avatar} className="w-full h-full object-cover" alt="User" />
            ) : (
              user?.name.charAt(0).toUpperCase()
            )}
          </button>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto pb-20 bg-gray-50">
          {renderContent()}
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t flex justify-around py-3 px-6 z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
          <NavButton 
            icon={<Home size={22} />} 
            label="Home" 
            active={view === AppView.HOME} 
            onClick={() => setView(AppView.HOME)} 
          />
          <NavButton 
            icon={<FileText size={22} />} 
            label="Notes" 
            active={[AppView.BRANCHES, AppView.SEMESTERS, AppView.SUBJECTS, AppView.NOTES].includes(view)} 
            onClick={() => setView(AppView.BRANCHES)} 
          />
          <NavButton 
            icon={<MessageCircle size={22} />} 
            label="Ask AI" 
            active={view === AppView.CHAT} 
            onClick={() => setView(AppView.CHAT)} 
          />
          <NavButton 
            icon={<User size={22} />} 
            label="Profile" 
            active={view === AppView.PROFILE} 
            onClick={() => setView(AppView.PROFILE)} 
          />
        </nav>
      </div>
    </div>
  );
};

const NavButton: React.FC<{ icon: React.ReactNode; label: string; active: boolean; onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all duration-200 ${active ? 'text-blue-600 scale-105' : 'text-gray-400 hover:text-gray-600'}`}
  >
    {icon}
    <span className="text-[10px] font-medium uppercase tracking-wider">{label}</span>
  </button>
);

export default App;
