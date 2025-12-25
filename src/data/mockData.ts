import { User, Course, Quiz, QuizResult, StudentResult } from '@/types';

// =============================================
// Mock Data for Development
// Replace with actual API calls in production
// =============================================

export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'student@example.com',
    name: 'John Student',
    role: 'student',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'user-2',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    createdAt: '2024-01-01T10:00:00Z',
  },
  {
    id: 'user-3',
    email: 'jane@example.com',
    name: 'Jane Doe',
    role: 'student',
    createdAt: '2024-02-10T10:00:00Z',
  },
];

export const mockCourses: Course[] = [
  {
    id: 'course-1',
    title: 'Introduction to Web Development',
    description: 'Learn the fundamentals of HTML, CSS, and JavaScript. Build your first website from scratch and understand how the web works.',
    instructor: 'Dr. Sarah Chen',
    duration: '8 weeks',
    level: 'Beginner',
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=450&fit=crop',
    enrolledCount: 1234,
    rating: 4.8,
    createdAt: '2024-01-01T10:00:00Z',
    modules: [
      {
        id: 'mod-1',
        title: 'Getting Started with HTML',
        description: 'Learn the building blocks of web pages',
        order: 1,
        lessons: [
          { id: 'les-1', title: 'What is HTML?', duration: '15 min', type: 'video', completed: true },
          { id: 'les-2', title: 'Basic HTML Structure', duration: '20 min', type: 'video', completed: true },
          { id: 'les-3', title: 'HTML Elements & Tags', duration: '25 min', type: 'reading', completed: false },
        ],
      },
      {
        id: 'mod-2',
        title: 'Styling with CSS',
        description: 'Make your websites beautiful',
        order: 2,
        lessons: [
          { id: 'les-4', title: 'Introduction to CSS', duration: '20 min', type: 'video', completed: false },
          { id: 'les-5', title: 'Selectors & Properties', duration: '30 min', type: 'video', completed: false },
          { id: 'les-6', title: 'Module Quiz', duration: '15 min', type: 'quiz', completed: false },
        ],
      },
    ],
    materials: [
      { id: 'mat-1', title: 'HTML Cheat Sheet', type: 'pdf', url: '/materials/html-cheatsheet.pdf', size: '2.4 MB' },
      { id: 'mat-2', title: 'CSS Reference Guide', type: 'pdf', url: '/materials/css-reference.pdf', size: '3.1 MB' },
      { id: 'mat-3', title: 'Project Starter Files', type: 'link', url: 'https://github.com/example/starter' },
    ],
  },
  {
    id: 'course-2',
    title: 'Advanced React Development',
    description: 'Master React hooks, state management, and build production-ready applications with TypeScript and modern tooling.',
    instructor: 'Alex Johnson',
    duration: '10 weeks',
    level: 'Advanced',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop',
    enrolledCount: 856,
    rating: 4.9,
    createdAt: '2024-02-15T10:00:00Z',
    modules: [
      {
        id: 'mod-3',
        title: 'React Hooks Deep Dive',
        description: 'Master useState, useEffect, and custom hooks',
        order: 1,
        lessons: [
          { id: 'les-7', title: 'useState Patterns', duration: '25 min', type: 'video', completed: false },
          { id: 'les-8', title: 'useEffect Best Practices', duration: '30 min', type: 'video', completed: false },
          { id: 'les-9', title: 'Building Custom Hooks', duration: '35 min', type: 'video', completed: false },
        ],
      },
    ],
    materials: [
      { id: 'mat-4', title: 'React Patterns Guide', type: 'pdf', url: '/materials/react-patterns.pdf', size: '4.2 MB' },
    ],
  },
  {
    id: 'course-3',
    title: 'Data Science Fundamentals',
    description: 'Learn Python, pandas, and data visualization. Analyze real datasets and build your data science portfolio.',
    instructor: 'Dr. Michael Brown',
    duration: '12 weeks',
    level: 'Intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
    enrolledCount: 2103,
    rating: 4.7,
    createdAt: '2024-03-01T10:00:00Z',
    modules: [
      {
        id: 'mod-4',
        title: 'Python for Data Science',
        description: 'Essential Python skills for data analysis',
        order: 1,
        lessons: [
          { id: 'les-10', title: 'Python Basics Review', duration: '20 min', type: 'video', completed: false },
          { id: 'les-11', title: 'NumPy Essentials', duration: '30 min', type: 'video', completed: false },
        ],
      },
    ],
    materials: [
      { id: 'mat-5', title: 'Python Data Science Handbook', type: 'pdf', url: '/materials/python-ds.pdf', size: '8.5 MB' },
    ],
  },
  {
    id: 'course-4',
    title: 'UI/UX Design Principles',
    description: 'Master the art of user interface and experience design. Learn Figma, design systems, and user research.',
    instructor: 'Emily Davis',
    duration: '6 weeks',
    level: 'Beginner',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop',
    enrolledCount: 1567,
    rating: 4.6,
    createdAt: '2024-03-15T10:00:00Z',
    modules: [],
    materials: [],
  },
];

export const mockQuizzes: Quiz[] = [
  {
    id: 'quiz-1',
    courseId: 'course-1',
    title: 'HTML Fundamentals Quiz',
    description: 'Test your knowledge of HTML basics',
    timeLimit: 15,
    passingScore: 70,
    questions: [
      {
        id: 'q-1',
        text: 'What does HTML stand for?',
        options: [
          { id: 'opt-1', text: 'Hyper Text Markup Language' },
          { id: 'opt-2', text: 'High Tech Modern Language' },
          { id: 'opt-3', text: 'Hyper Transfer Markup Language' },
          { id: 'opt-4', text: 'Home Tool Markup Language' },
        ],
        correctOptionId: 'opt-1',
        points: 10,
      },
      {
        id: 'q-2',
        text: 'Which tag is used for the largest heading?',
        options: [
          { id: 'opt-5', text: '<heading>' },
          { id: 'opt-6', text: '<h6>' },
          { id: 'opt-7', text: '<h1>' },
          { id: 'opt-8', text: '<head>' },
        ],
        correctOptionId: 'opt-7',
        points: 10,
      },
      {
        id: 'q-3',
        text: 'Which attribute specifies the URL for a link?',
        options: [
          { id: 'opt-9', text: 'src' },
          { id: 'opt-10', text: 'href' },
          { id: 'opt-11', text: 'link' },
          { id: 'opt-12', text: 'url' },
        ],
        correctOptionId: 'opt-10',
        points: 10,
      },
      {
        id: 'q-4',
        text: 'Which tag is used to create an unordered list?',
        options: [
          { id: 'opt-13', text: '<ol>' },
          { id: 'opt-14', text: '<list>' },
          { id: 'opt-15', text: '<ul>' },
          { id: 'opt-16', text: '<li>' },
        ],
        correctOptionId: 'opt-15',
        points: 10,
      },
      {
        id: 'q-5',
        text: 'What is the correct HTML element for inserting a line break?',
        options: [
          { id: 'opt-17', text: '<break>' },
          { id: 'opt-18', text: '<lb>' },
          { id: 'opt-19', text: '<br>' },
          { id: 'opt-20', text: '<newline>' },
        ],
        correctOptionId: 'opt-19',
        points: 10,
      },
    ],
  },
  {
    id: 'quiz-2',
    courseId: 'course-2',
    title: 'React Hooks Assessment',
    description: 'Test your understanding of React Hooks',
    timeLimit: 20,
    passingScore: 75,
    questions: [
      {
        id: 'q-6',
        text: 'Which hook is used for side effects in React?',
        options: [
          { id: 'opt-21', text: 'useState' },
          { id: 'opt-22', text: 'useEffect' },
          { id: 'opt-23', text: 'useContext' },
          { id: 'opt-24', text: 'useReducer' },
        ],
        correctOptionId: 'opt-22',
        points: 10,
      },
      {
        id: 'q-7',
        text: 'What does useState return?',
        options: [
          { id: 'opt-25', text: 'A single value' },
          { id: 'opt-26', text: 'An array with state and setter function' },
          { id: 'opt-27', text: 'An object with state properties' },
          { id: 'opt-28', text: 'A promise' },
        ],
        correctOptionId: 'opt-26',
        points: 10,
      },
    ],
  },
];

export const mockQuizResults: QuizResult[] = [
  {
    id: 'result-1',
    quizId: 'quiz-1',
    quizTitle: 'HTML Fundamentals Quiz',
    courseId: 'course-1',
    courseTitle: 'Introduction to Web Development',
    userId: 'user-1',
    score: 40,
    totalPoints: 50,
    percentage: 80,
    passed: true,
    attemptedAt: '2024-03-20T14:30:00Z',
    answers: [
      { questionId: 'q-1', selectedOptionId: 'opt-1', correctOptionId: 'opt-1', isCorrect: true },
      { questionId: 'q-2', selectedOptionId: 'opt-7', correctOptionId: 'opt-7', isCorrect: true },
      { questionId: 'q-3', selectedOptionId: 'opt-10', correctOptionId: 'opt-10', isCorrect: true },
      { questionId: 'q-4', selectedOptionId: 'opt-15', correctOptionId: 'opt-15', isCorrect: true },
      { questionId: 'q-5', selectedOptionId: 'opt-17', correctOptionId: 'opt-19', isCorrect: false },
    ],
  },
];

export const mockStudentResults: StudentResult[] = [
  {
    id: 'sr-1',
    studentId: 'user-1',
    studentName: 'John Student',
    studentEmail: 'student@example.com',
    quizId: 'quiz-1',
    quizTitle: 'HTML Fundamentals Quiz',
    courseTitle: 'Introduction to Web Development',
    score: 40,
    totalPoints: 50,
    percentage: 80,
    passed: true,
    attemptedAt: '2024-03-20T14:30:00Z',
  },
  {
    id: 'sr-2',
    studentId: 'user-3',
    studentName: 'Jane Doe',
    studentEmail: 'jane@example.com',
    quizId: 'quiz-1',
    quizTitle: 'HTML Fundamentals Quiz',
    courseTitle: 'Introduction to Web Development',
    score: 50,
    totalPoints: 50,
    percentage: 100,
    passed: true,
    attemptedAt: '2024-03-21T09:15:00Z',
  },
  {
    id: 'sr-3',
    studentId: 'user-3',
    studentName: 'Jane Doe',
    studentEmail: 'jane@example.com',
    quizId: 'quiz-2',
    quizTitle: 'React Hooks Assessment',
    courseTitle: 'Advanced React Development',
    score: 15,
    totalPoints: 20,
    percentage: 75,
    passed: true,
    attemptedAt: '2024-03-22T11:45:00Z',
  },
];
