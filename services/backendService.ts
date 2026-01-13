
import { ChatMessage, GeneratedQuestion, Branch, Semester, Subject, NoteUnit } from '../types';
import { branches, semesters, subjects, getNoteUnits } from './dataService';

/**
 * MOCK BACKEND SERVICE
 * This service simulates database operations using browser LocalStorage.
 * In a real-world scenario, these would be calls to Firebase or a Node.js REST API.
 */

const STORAGE_KEYS = {
  USER: 'eh_user',
  CHAT_HISTORY: 'eh_chat_history',
  SCAN_HISTORY: 'eh_scan_history',
  THEME: 'eh_theme'
};

export class BackendService {
  // --- AUTH & PROFILE ---
  static async getCurrentUser() {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  }

  /**
   * Simulates a secure login using Google identity credentials.
   */
  static async login(name: string, email: string) {
    // Determine avatar from Google-like source or simulated OIDC data
    const seed = name.replace(/\s/g, '');
    const user = { 
      name, 
      email, 
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`,
      authProvider: 'google',
      lastLogin: Date.now()
    };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    return user;
  }

  static async logout() {
    localStorage.removeItem(STORAGE_KEYS.USER);
    // Note: We might want to keep history tied to the local device or clear it on logout
    // For this simulation, we clear to ensure privacy as requested for "real" behavior.
    localStorage.removeItem(STORAGE_KEYS.CHAT_HISTORY);
    localStorage.removeItem(STORAGE_KEYS.SCAN_HISTORY);
  }

  static async updateProfile(updates: Partial<{ name: string; email: string; avatar: string }>) {
    const user = await this.getCurrentUser();
    if (!user) return null;
    const updatedUser = { ...user, ...updates };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
    return updatedUser;
  }

  // --- THEME ---
  static getThemePreference(): boolean {
    return localStorage.getItem(STORAGE_KEYS.THEME) === 'dark';
  }

  static setThemePreference(isDark: boolean) {
    localStorage.setItem(STORAGE_KEYS.THEME, isDark ? 'dark' : 'light');
  }

  // --- DATA RETRIEVAL (Notes) ---
  static async getBranches(): Promise<Branch[]> {
    return branches;
  }

  static async getSemesters(): Promise<Semester[]> {
    return semesters;
  }

  static async getSubjects(branchId: string, semesterId: number): Promise<Subject[]> {
    return subjects.filter(s => s.branchId === branchId && s.semesterId === semesterId);
  }

  static async getNoteUnits(subjectId: string): Promise<NoteUnit[]> {
    return getNoteUnits(subjectId);
  }

  // --- AI CHAT HISTORY ---
  static async getChatHistory(): Promise<ChatMessage[]> {
    const data = localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY);
    return data ? JSON.parse(data) : [];
  }

  static async saveChatHistory(messages: ChatMessage[]) {
    localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(messages));
  }

  // --- SCAN HISTORY ---
  static async saveScanResult(questions: GeneratedQuestion[]) {
    const history = await this.getScanHistory();
    const newScan = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      questions
    };
    localStorage.setItem(STORAGE_KEYS.SCAN_HISTORY, JSON.stringify([newScan, ...history]));
    return newScan;
  }

  static async getScanHistory(): Promise<any[]> {
    const data = localStorage.getItem(STORAGE_KEYS.SCAN_HISTORY);
    return data ? JSON.parse(data) : [];
  }
}
