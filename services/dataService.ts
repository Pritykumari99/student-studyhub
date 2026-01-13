
import { Semester, Subject, NoteUnit, Branch, Formula, PreviousPaper, EngineeringBook } from '../types';

export const branches: Branch[] = [
  { id: 'cse', name: 'Computer Science', icon: '💻' },
  { id: 'ece', name: 'Electronics & Comm.', icon: '📡' },
  { id: 'me', name: 'Mechanical Eng.', icon: '⚙️' },
  { id: 'ee', name: 'Electrical Eng.', icon: '⚡' },
  { id: 'ce', name: 'Civil Engineering', icon: '🏗️' },
  { id: 'it', name: 'Information Tech.', icon: '🌐' },
];

export const semesters: Semester[] = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: `Semester ${i + 1}`,
}));

export const subjects: Subject[] = [
  // Semester 1 (Common)
  { id: 'm1', semesterId: 1, branchId: 'cse', title: 'Engineering Mathematics I', code: 'MATH101' },
  { id: 'c1', semesterId: 1, branchId: 'cse', title: 'Programming in C', code: 'CS102' },
  { id: 'e1', semesterId: 1, branchId: 'cse', title: 'Basic Electronics', code: 'EC103' },
  
  // Semester 3 (CSE)
  { id: 'ds', semesterId: 3, branchId: 'cse', title: 'Data Structures', code: 'CS301' },
  { id: 'dld', semesterId: 3, branchId: 'cse', title: 'Digital Logic Design', code: 'CS302' },
  
  // Semester 4 (ECE)
  { id: 'dc', semesterId: 4, branchId: 'ece', title: 'Digital Communication', code: 'EC401' },
  { id: 'ae', semesterId: 4, branchId: 'ece', title: 'Analog Electronics', code: 'EC402' },

  // Semester 5 (CSE)
  { id: 'os', semesterId: 5, branchId: 'cse', title: 'Operating Systems', code: 'CS501' },
  { id: 'cn', semesterId: 5, branchId: 'cse', title: 'Computer Networks', code: 'CS502' },

  // Semester 3 (ECE Example)
  { id: 'ss', semesterId: 3, branchId: 'ece', title: 'Signals & Systems', code: 'EC301' },
];

export const getNoteUnits = (subjectId: string): NoteUnit[] => {
  if (subjectId === 'dc') {
    return [
      { id: 'dc_u1', subjectId, title: 'Unit 1: Sampling & Quantization', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
      { id: 'dc_u2', subjectId, title: 'Unit 2: Waveform Coding (PCM, DPCM, ADM)', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
      { id: 'dc_u3', subjectId, title: 'Unit 3: Baseband Shaping & Line Coding', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
      { id: 'dc_u4', subjectId, title: 'Unit 4: Digital Modulation (ASK, FSK, PSK)', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
      { id: 'dc_u5', subjectId, title: 'Unit 5: Information Theory & Error Control', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
    ];
  }

  return [
    { id: 'u1', subjectId, title: 'Unit 1: Fundamentals & Basics', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
    { id: 'u2', subjectId, title: 'Unit 2: Advanced Applications', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
    { id: 'u3', subjectId, title: 'Unit 3: Real-world Case Studies', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
    { id: 'u4', subjectId, title: 'Unit 4: Future Trends', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
    { id: 'u5', subjectId, title: 'Unit 5: Exam Preparation', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
  ];
}

export const engineeringBooks: EngineeringBook[] = [
  { id: 'b1', title: 'Modern Operating Systems', author: 'Andrew S. Tanenbaum', branchId: 'cse', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', coverColor: 'bg-blue-900' },
  { id: 'b2', title: 'Introduction to Algorithms', author: 'Cormen, Leiserson, Rivest', branchId: 'cse', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', coverColor: 'bg-indigo-900' },
  { id: 'b3', title: 'Digital Signal Processing', author: 'John G. Proakis', branchId: 'ece', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', coverColor: 'bg-purple-900' },
  { id: 'b4', title: 'Signals and Systems', author: 'Alan V. Oppenheim', branchId: 'ece', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', coverColor: 'bg-red-900' },
  { id: 'b5', title: 'Thermodynamics', author: 'Yunus A. Cengel', branchId: 'me', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', coverColor: 'bg-green-900' },
  { id: 'b6', title: 'Theory of Machines', author: 'R.S. Khurmi', branchId: 'me', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', coverColor: 'bg-orange-900' },
];

export const engineeringFormulas: Formula[] = [
  { category: 'Mathematics', title: 'Euler\'s Formula', expression: 'e^(iθ) = cos(θ) + i sin(θ)', description: 'Relates complex exponentials to trigonometric functions.' },
  { category: 'Mathematics', title: 'Quadratic Formula', expression: 'x = [-b ± √(b² - 4ac)] / 2a', description: 'Solutions for ax² + bx + c = 0.' },
  { category: 'Physics', title: 'Newton\'s Second Law', expression: 'F = m × a', description: 'Force equals mass times acceleration.' },
  { category: 'Physics', title: 'Einstein\'s Energy', expression: 'E = mc²', description: 'Mass-energy equivalence formula.' },
  { category: 'Electrical', title: 'Ohm\'s Law', expression: 'V = I × R', description: 'Voltage = Current × Resistance.' },
  { category: 'Electrical', title: 'Power Law', expression: 'P = V × I = I²R', description: 'Electrical power calculation.' },
  { category: 'Mechanical', title: 'Bernoulli\'s Equation', expression: 'P + ½ρv² + ρgh = C', description: 'Describes fluid flow along a streamline.' },
  { category: 'Mechanical', title: 'Ideal Gas Law', expression: 'PV = nRT', description: 'Equation of state of a hypothetical ideal gas.' },
  { category: 'Computer Science', title: 'Binary Search Time', expression: 'O(log n)', description: 'Average and worst-case performance of binary search.' },
  { category: 'Computer Science', title: 'Quick Sort Time', expression: 'O(n log n)', description: 'Average case time complexity for Quick Sort.' },
];

export const previousPapers: PreviousPaper[] = [
  { id: 'p1', subject: 'Mathematics I', year: '2023', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
  { id: 'p2', subject: 'Programming in C', year: '2023', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
  { id: 'p3', subject: 'Data Structures', year: '2022', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
  { id: 'p4', subject: 'Operating Systems', year: '2021', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
  { id: 'p5', subject: 'Basic Electronics', year: '2023', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
  { id: 'p6', subject: 'Digital Logic', year: '2022', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
];
