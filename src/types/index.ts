// =============================================
// LMS TypeScript Interfaces
// These match the API contract for your Express backend
// =============================================

// User & Authentication Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'admin';
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

// Course Types
export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnail: string;
  enrolledCount: number;
  rating: number;
  modules: Module[];
  materials: Material[];
  createdAt: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'reading' | 'quiz';
  completed?: boolean;
}

export interface Material {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'link';
  url: string;
  size?: string;
}

// Quiz Types
export interface Quiz {
  id: string;
  courseId: string;
  title: string;
  description: string;
  timeLimit: number; // in minutes
  passingScore: number; // percentage
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
  correctOptionId: string;
  points: number;
}

export interface Option {
  id: string;
  text: string;
}

export interface QuizAttempt {
  quizId: string;
  answers: { questionId: string; selectedOptionId: string }[];
}

export interface QuizResult {
  id: string;
  quizId: string;
  quizTitle: string;
  courseId: string;
  courseTitle: string;
  userId: string;
  score: number;
  totalPoints: number;
  percentage: number;
  passed: boolean;
  attemptedAt: string;
  answers: {
    questionId: string;
    selectedOptionId: string;
    correctOptionId: string;
    isCorrect: boolean;
  }[];
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Admin Types
export interface CreateCourseRequest {
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnail?: string;
}

export interface CreateQuestionRequest {
  quizId: string;
  text: string;
  options: { text: string }[];
  correctOptionIndex: number;
  points: number;
}

export interface StudentResult {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  quizId: string;
  quizTitle: string;
  courseTitle: string;
  score: number;
  totalPoints: number;
  percentage: number;
  passed: boolean;
  attemptedAt: string;
}

// Guide Types
export interface Guide {
  id: number;
  name: string;
  filename: string;
  url: string;
  description: string;
}
