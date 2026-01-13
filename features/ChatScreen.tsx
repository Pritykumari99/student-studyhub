
import React, { useState, useRef, useEffect } from 'react';
import { GeminiService } from '../services/geminiService';
import { BackendService } from '../services/backendService';
import { ChatMessage } from '../types';
import { Send, Bot, Loader2, Trash2 } from 'lucide-react';

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load chat history from backend
  useEffect(() => {
    const loadHistory = async () => {
      const history = await BackendService.getChatHistory();
      if (history.length === 0) {
        const welcome = { id: '1', role: 'model', text: 'Hello! I am your Engineering Tutor. How can I help you with your studies today?', timestamp: Date.now() };
        setMessages([welcome as ChatMessage]);
        BackendService.saveChatHistory([welcome as ChatMessage]);
      } else {
        setMessages(history);
      }
      setIsLoaded(true);
    };
    loadHistory();
  }, []);

  // Save to backend whenever messages change
  useEffect(() => {
    if (isLoaded) {
      BackendService.saveChatHistory(messages);
    }
  }, [messages, isLoaded]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await GeminiService.solveQuestion(input);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: 'Sorry, I encountered an error. Please try again.',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = async () => {
    if (window.confirm("Are you sure you want to clear the chat history?")) {
      const welcome = { id: '1', role: 'model', text: 'Hello! I am your Engineering Tutor. How can I help you with your studies today?', timestamp: Date.now() };
      setMessages([welcome as ChatMessage]);
      await BackendService.saveChatHistory([welcome as ChatMessage]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-slate-900 transition-colors">
      <div className="p-4 bg-white dark:bg-slate-800 border-b dark:border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="font-bold text-sm dark:text-white">AI Engineering Tutor</h3>
            <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Active session</p>
          </div>
        </div>
        <button 
          onClick={clearHistory}
          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
          title="Clear History"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-4 shadow-sm text-sm ${
              msg.role === 'user' 
              ? 'bg-blue-600 text-white rounded-tr-none' 
              : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-white/5 rounded-tl-none'
            }`}>
              <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed">
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-white/5 rounded-2xl rounded-tl-none p-4 flex items-center gap-2 shadow-sm">
              <Loader2 size={16} className="animate-spin text-purple-600 dark:text-purple-400" />
              <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">Tutor is thinking...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white dark:bg-slate-800 border-t dark:border-white/5">
        <div className="flex gap-2">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything about engineering..."
            className="flex-1 bg-gray-100 dark:bg-slate-900 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-md shadow-blue-200 dark:shadow-none"
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-[9px] text-center text-gray-400 mt-2">
          Educational AI • Persists locally on your device
        </p>
      </div>
    </div>
  );
};

export default ChatScreen;
