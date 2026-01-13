
import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (name: string, email: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [showAccountPicker, setShowAccountPicker] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<{name: string, email: string} | null>(null);

  const mockAccounts = [
    { name: "John Doe", email: "johndoe.eng@gmail.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John" },
    { name: "Jane Smith", email: "jane.smith.study@gmail.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane" }
  ];

  const handleGoogleClick = () => {
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      setShowAccountPicker(true);
    }, 1200);
  };

  const handleAccountSelect = (account: typeof mockAccounts[0]) => {
    setSelectedAccount(account);
    setShowAccountPicker(false);
    setIsAuthenticating(true);
    
    // Simulate final "OIDC token" verification
    setTimeout(() => {
      onLogin(account.name, account.email);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-[#000] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#D4AF37]/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 blur-[120px] rounded-full"></div>

      <div className="bg-[#111] p-10 rounded-[2.5rem] shadow-2xl w-full max-w-sm space-y-10 border border-[#D4AF37]/20 relative z-10">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative flex flex-col items-center">
            <div className="flex gap-4 mb-2">
              <StarIcon className="w-5 h-5 text-[#D4AF37] animate-pulse" />
              <StarIcon className="w-7 h-7 text-[#D4AF37] -mt-3" />
              <StarIcon className="w-5 h-5 text-[#D4AF37] animate-pulse" />
            </div>
            <div className="text-[#D4AF37] mb-2 transform hover:scale-110 transition-transform duration-300">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
                <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
              </svg>
            </div>
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-black tracking-[0.15em] text-[#D4AF37] uppercase italic">STUDENT</h1>
            <h1 className="text-3xl font-black tracking-[0.15em] text-[#D4AF37] uppercase">STUDYHUB</h1>
            <div className="w-32 h-[3px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto"></div>
            <p className="text-gray-500 text-[10px] font-bold tracking-widest uppercase mt-4">Premium Engineering Resources</p>
          </div>
        </div>

        <div className="space-y-6">
          {!isAuthenticating ? (
            <button 
              onClick={handleGoogleClick}
              className="w-full flex items-center justify-center gap-4 bg-white hover:bg-gray-100 text-gray-700 font-bold py-4 rounded-2xl shadow-xl transition-all transform active:scale-95 group"
            >
              <svg width="20" height="20" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                <path fill="none" d="M0 0h48v48H0z"/>
              </svg>
              <span>Sign in with Google</span>
            </button>
          ) : (
            <div className="w-full flex flex-col items-center justify-center space-y-4 py-4">
              <Loader2 className="w-8 h-8 text-[#D4AF37] animate-spin" />
              <p className="text-[#D4AF37] text-xs font-bold tracking-widest animate-pulse">VERIFYING ACCOUNT...</p>
            </div>
          )}

          <div className="flex items-center gap-4 text-gray-700">
            <div className="flex-1 h-[1px] bg-white/5"></div>
            <span className="text-[10px] font-bold text-gray-600 uppercase">Secure OAuth 2.0</span>
            <div className="flex-1 h-[1px] bg-white/5"></div>
          </div>
        </div>
        
        <p className="text-[9px] text-center text-gray-600 uppercase tracking-tighter max-w-[200px] mx-auto leading-relaxed">
          By signing in, you agree to our Terms of Service & Privacy Policy for Academic Excellence.
        </p>
      </div>

      {/* Simulated Google Account Picker Modal */}
      {showAccountPicker && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md p-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl w-full max-w-xs shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b">
              <div className="flex justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
              </div>
              <h2 className="text-lg font-bold text-center text-gray-800">Choose an account</h2>
              <p className="text-xs text-center text-gray-500 mt-1">to continue to Student StudyHub</p>
            </div>
            <div className="divide-y">
              {mockAccounts.map((acc, i) => (
                <button 
                  key={i}
                  onClick={() => handleAccountSelect(acc)}
                  className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition text-left"
                >
                  <img src={acc.avatar} className="w-8 h-8 rounded-full border" alt={acc.name} />
                  <div>
                    <p className="text-sm font-bold text-gray-800">{acc.name}</p>
                    <p className="text-[10px] text-gray-500">{acc.email}</p>
                  </div>
                </button>
              ))}
              <button 
                onClick={() => setShowAccountPicker(false)}
                className="w-full p-4 text-xs font-bold text-blue-600 hover:bg-gray-50 transition text-left"
              >
                Use another account
              </button>
            </div>
            <div className="p-4 bg-gray-50 text-[10px] text-gray-500 leading-relaxed">
              To continue, Google will share your name, email address, language preference, and profile picture with Student StudyHub.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StarIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

export default LoginScreen;
