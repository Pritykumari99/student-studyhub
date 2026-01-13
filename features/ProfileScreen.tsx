
import React, { useState, useRef } from 'react';
import { Phone, MessageSquare, LogOut, ChevronRight, Camera, X, Mail, Send } from 'lucide-react';

interface ProfileScreenProps {
  user: { name: string; email: string; avatar?: string };
  onLogout: () => void;
  onUpdateAvatar: (avatar: string) => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, onLogout, onUpdateAvatar }) => {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [enquiry, setEnquiry] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Please select an image smaller than 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFeedbackSubmit = () => {
    if (!feedback.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowFeedbackModal(false);
      setFeedback("");
      alert("Thank you! Your feedback has been sent to the team.");
    }, 1500);
  };

  const handleSupportSend = () => {
    if (!enquiry.trim()) return;
    const mailtoUrl = `mailto:studentstudyhub@gmail.com?subject=Enquiry from ${user.name}&body=${encodeURIComponent(enquiry)}`;
    const link = document.createElement('a');
    link.href = mailtoUrl;
    link.click();
    setShowSupportModal(false);
    setEnquiry("");
  };

  return (
    <div className="p-6 space-y-8 pb-24 animate-in slide-in-from-bottom-4 duration-300">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative group">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-xl bg-blue-100 flex items-center justify-center transition-all group-hover:opacity-90">
            {user.avatar ? (
              <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-4xl font-black text-blue-600 uppercase">{user.name.charAt(0)}</span>
            )}
          </div>
          <button 
            onClick={triggerFilePicker}
            className="absolute bottom-1 right-1 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition active:scale-90"
            title="Change Photo"
          >
            <Camera size={16} />
          </button>
          <input 
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 leading-tight">{user.name}</h2>
          <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
            <Mail size={12} /> {user.email}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Account Settings</h3>
        
        <div className="bg-white rounded-3xl shadow-sm border border-black/5 divide-y divide-gray-100 overflow-hidden">
          <SettingItem 
            icon={<Phone className="text-green-500" />}
            label="Contact Support"
            onClick={() => setShowSupportModal(true)}
          />
          <SettingItem 
            icon={<MessageSquare className="text-blue-500" />}
            label="Submit Feedback"
            onClick={() => setShowFeedbackModal(true)}
          />
        </div>

        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-3 p-4 bg-red-50 text-red-600 rounded-2xl font-bold hover:bg-red-100 transition-all mt-4 active:scale-95"
        >
          <LogOut size={20} /> Logout Account
        </button>
      </div>

      {/* Support Enquiry Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-xs rounded-3xl p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200 border border-white/10">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-lg text-gray-800">Contact Support</h4>
              <button onClick={() => setShowSupportModal(false)} className="p-1 hover:bg-gray-100 rounded-full transition">
                <X size={20} />
              </button>
            </div>
            <p className="text-xs text-gray-500">Write your enquiry for studentstudyhub@gmail.com</p>
            <textarea 
              value={enquiry}
              onChange={(e) => setEnquiry(e.target.value)}
              placeholder="Type your question or issue here..."
              className="w-full h-40 p-4 bg-gray-50 text-gray-800 border rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-sm resize-none"
            />
            <button 
              onClick={handleSupportSend}
              disabled={!enquiry.trim()}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Send size={16} /> Send Enquiry
            </button>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-xs rounded-3xl p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-lg text-gray-800">Share Feedback</h4>
              <button onClick={() => setShowFeedbackModal(false)} className="p-1 hover:bg-gray-100 rounded-full transition">
                <X size={20} />
              </button>
            </div>
            <textarea 
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Tell us what you love or what we can improve..."
              className="w-full h-32 p-4 bg-gray-50 text-gray-800 border rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-sm resize-none"
            />
            <button 
              onClick={handleFeedbackSubmit}
              disabled={isSubmitting || !feedback.trim()}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? "Sending..." : "Send Feedback"}
            </button>
          </div>
        </div>
      )}

      <div className="text-center">
        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Student StudyHub v1.1.2</p>
      </div>
    </div>
  );
};

const SettingItem: React.FC<{ icon: React.ReactNode; label: string; action?: React.ReactNode; onClick?: () => void }> = ({ icon, label, action, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center justify-between p-4 ${onClick ? 'cursor-pointer active:bg-gray-50 transition duration-150' : ''}`}
  >
    <div className="flex items-center gap-4">
      <div className="p-2 bg-gray-50 rounded-xl shadow-sm">
        {icon}
      </div>
      <span className="font-semibold text-gray-700">{label}</span>
    </div>
    {action || <ChevronRight size={18} className="text-gray-300" />}
  </div>
);

export default ProfileScreen;
