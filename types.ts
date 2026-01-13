
export enum AppView {
  HOME = 'HOME',
  BRANCHES = 'BRANCHES',
  SEMESTERS = 'SEMESTERS',
  SUBJECTS = 'SUBJECTS',
  NOTES = 'NOTES',
  CHAT = 'CHAT',
  UPLOAD = 'UPLOAD',
  LOGIN = 'LOGIN',
  PROFILE = 'PROFILE',
  FORMULAS = 'FORMULAS',
  PAPERS = 'PAPERS',
  BOOKS = 'BOOKS'
}

export interface Branch {
  id: string;
  name: string;
  icon: string;
}

export interface Semester {
  id: number;
  name: string;
}

export interface Subject {
  id: string;
  semesterId: number;
  branchId: string;
  title: string;
  code: string;
}

export interface NoteUnit {
  id: string;
  subjectId: string;
  title: string;
  pdfUrl: string;
}

export interface EngineeringBook {
  id: string;
  title: string;
  author: string;
  branchId: string;
  pdfUrl: string;
  coverColor: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface GeneratedQuestion {
  id: string;
  text: string;
  marks: number;
  type: 'Theoretical' | 'Numerical' | 'Conceptual';
}

export interface Formula {
  category: string;
  title: string;
  expression: string;
  description: string;
}

export interface PreviousPaper {
  id: string;
  subject: string;
  year: string;
  url: string;
}
