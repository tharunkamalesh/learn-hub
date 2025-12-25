/**
 * API Service Layer
 * ==================
 * 
 * This file defines all API endpoints and their implementations.
 * Currently uses mock data for development.
 * 
 * To connect to your Express backend:
 * 1. Set API_BASE_URL to your backend URL (e.g., 'http://localhost:5000/api')
 * 2. Replace mock implementations with actual fetch calls
 * 3. Handle JWT tokens for authentication
 * 
 * Required Backend Endpoints:
 * ---------------------------
 * POST   /api/auth/signup          - Student signup
 * POST   /api/auth/login           - Student/Admin login
 * GET    /api/courses              - Get all courses
 * GET    /api/courses/:id          - Get course details
 * GET    /api/courses/:id/quiz     - Get quiz for a course
 * POST   /api/quizzes/:id/attempt  - Submit quiz answers
 * GET    /api/results              - Get user's quiz results
 * GET    /api/materials/:id        - Download material
 * 
 * Admin Endpoints:
 * POST   /api/admin/courses        - Create course
 * POST   /api/admin/quizzes        - Create quiz
 * POST   /api/admin/questions      - Add quiz question
 * GET    /api/admin/results        - View all student results
 */

import {
  User,
  AuthResponse,
  LoginRequest,
  SignupRequest,
  Course,
  Quiz,
  QuizAttempt,
  QuizResult,
  ApiResponse,
  CreateCourseRequest,
  CreateQuestionRequest,
  StudentResult,
} from '@/types';
import { mockUsers, mockCourses, mockQuizzes, mockQuizResults, mockStudentResults } from '@/data/mockData';

// Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Simulated delay for realistic UX
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Token management
let authToken: string | null = localStorage.getItem('token');

const setToken = (token: string | null) => {
  authToken = token;
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
});

// =============================================
// Authentication APIs
// =============================================

export const authApi = {
  /**
   * Student Signup
   * POST /api/auth/signup
   */
  async signup(data: SignupRequest): Promise<AuthResponse> {
    await delay(500);
    
    // Mock implementation
    const existingUser = mockUsers.find(u => u.email === data.email);
    if (existingUser) {
      return { success: false, message: 'Email already registered' };
    }
    
    const newUser: User = {
      id: `user-${Date.now()}`,
      email: data.email,
      name: data.name,
      role: 'student',
      createdAt: new Date().toISOString(),
    };
    
    const token = `mock-jwt-token-${newUser.id}`;
    setToken(token);
    
    return {
      success: true,
      message: 'Account created successfully',
      token,
      user: newUser,
    };
    
    // Production implementation:
    // const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });
    // const result = await response.json();
    // if (result.success && result.token) setToken(result.token);
    // return result;
  },

  /**
   * Login (Student or Admin)
   * POST /api/auth/login
   */
  async login(data: LoginRequest): Promise<AuthResponse> {
    await delay(500);
    
    // Mock implementation
    const user = mockUsers.find(u => u.email === data.email);
    
    // For demo: password check (any non-empty password works)
    if (!user || !data.password) {
      return { success: false, message: 'Invalid email or password' };
    }
    
    const token = `mock-jwt-token-${user.id}`;
    setToken(token);
    
    return {
      success: true,
      message: 'Login successful',
      token,
      user,
    };
    
    // Production implementation:
    // const response = await fetch(`${API_BASE_URL}/auth/login`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });
    // const result = await response.json();
    // if (result.success && result.token) setToken(result.token);
    // return result;
  },

  /**
   * Logout - Clear token
   */
  logout(): void {
    setToken(null);
  },

  /**
   * Get current user from token
   */
  async getCurrentUser(): Promise<User | null> {
    if (!authToken) return null;
    
    await delay(200);
    
    // Mock: extract user ID from token
    const userId = authToken.replace('mock-jwt-token-', '');
    return mockUsers.find(u => u.id === userId) || null;
    
    // Production implementation:
    // const response = await fetch(`${API_BASE_URL}/auth/me`, {
    //   headers: getAuthHeaders(),
    // });
    // if (!response.ok) return null;
    // const result = await response.json();
    // return result.data;
  },
};

// =============================================
// Course APIs
// =============================================

export const courseApi = {
  /**
   * Get all courses
   * GET /api/courses
   */
  async getCourses(): Promise<Course[]> {
    await delay(300);
    return mockCourses;
    
    // Production implementation:
    // const response = await fetch(`${API_BASE_URL}/courses`, {
    //   headers: getAuthHeaders(),
    // });
    // const result = await response.json();
    // return result.data;
  },

  /**
   * Get course by ID
   * GET /api/courses/:id
   */
  async getCourseById(id: string): Promise<Course | null> {
    await delay(200);
    return mockCourses.find(c => c.id === id) || null;
    
    // Production implementation:
    // const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
    //   headers: getAuthHeaders(),
    // });
    // const result = await response.json();
    // return result.data;
  },

  /**
   * Get quiz for a course
   * GET /api/courses/:id/quiz
   */
  async getCourseQuiz(courseId: string): Promise<Quiz | null> {
    await delay(200);
    return mockQuizzes.find(q => q.courseId === courseId) || null;
    
    // Production implementation:
    // const response = await fetch(`${API_BASE_URL}/courses/${courseId}/quiz`, {
    //   headers: getAuthHeaders(),
    // });
    // const result = await response.json();
    // return result.data;
  },
};

// =============================================
// Quiz APIs
// =============================================

export const quizApi = {
  /**
   * Submit quiz attempt
   * POST /api/quizzes/:id/attempt
   */
  async submitQuiz(quizId: string, attempt: QuizAttempt): Promise<ApiResponse<QuizResult>> {
    await delay(800);
    
    const quiz = mockQuizzes.find(q => q.id === quizId);
    if (!quiz) {
      return { success: false, message: 'Quiz not found' };
    }
    
    const course = mockCourses.find(c => c.id === quiz.courseId);
    
    // Calculate score
    let score = 0;
    const answers = attempt.answers.map(answer => {
      const question = quiz.questions.find(q => q.id === answer.questionId);
      const isCorrect = question?.correctOptionId === answer.selectedOptionId;
      if (isCorrect && question) {
        score += question.points;
      }
      return {
        questionId: answer.questionId,
        selectedOptionId: answer.selectedOptionId,
        correctOptionId: question?.correctOptionId || '',
        isCorrect,
      };
    });
    
    const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);
    const percentage = Math.round((score / totalPoints) * 100);
    
    const result: QuizResult = {
      id: `result-${Date.now()}`,
      quizId,
      quizTitle: quiz.title,
      courseId: quiz.courseId,
      courseTitle: course?.title || 'Unknown Course',
      userId: 'user-1',
      score,
      totalPoints,
      percentage,
      passed: percentage >= quiz.passingScore,
      attemptedAt: new Date().toISOString(),
      answers,
    };
    
    // Add to mock results
    mockQuizResults.push(result);
    
    return {
      success: true,
      message: result.passed ? 'Congratulations! You passed!' : 'Quiz completed. Keep practicing!',
      data: result,
    };
    
    // Production implementation:
    // const response = await fetch(`${API_BASE_URL}/quizzes/${quizId}/attempt`, {
    //   method: 'POST',
    //   headers: getAuthHeaders(),
    //   body: JSON.stringify(attempt),
    // });
    // return response.json();
  },

  /**
   * Get user's quiz results
   * GET /api/results
   */
  async getResults(): Promise<QuizResult[]> {
    await delay(300);
    return mockQuizResults;
    
    // Production implementation:
    // const response = await fetch(`${API_BASE_URL}/results`, {
    //   headers: getAuthHeaders(),
    // });
    // const result = await response.json();
    // return result.data;
  },
};

// =============================================
// Admin APIs
// =============================================

export const adminApi = {
  /**
   * Create a new course
   * POST /api/admin/courses
   */
  async createCourse(data: CreateCourseRequest): Promise<ApiResponse<Course>> {
    await delay(500);
    
    const newCourse: Course = {
      id: `course-${Date.now()}`,
      ...data,
      thumbnail: data.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop',
      enrolledCount: 0,
      rating: 0,
      modules: [],
      materials: [],
      createdAt: new Date().toISOString(),
    };
    
    mockCourses.push(newCourse);
    
    return {
      success: true,
      message: 'Course created successfully',
      data: newCourse,
    };
    
    // Production implementation:
    // const response = await fetch(`${API_BASE_URL}/admin/courses`, {
    //   method: 'POST',
    //   headers: getAuthHeaders(),
    //   body: JSON.stringify(data),
    // });
    // return response.json();
  },

  /**
   * Add question to quiz
   * POST /api/admin/questions
   */
  async addQuestion(data: CreateQuestionRequest): Promise<ApiResponse<null>> {
    await delay(400);
    
    const quiz = mockQuizzes.find(q => q.id === data.quizId);
    if (!quiz) {
      return { success: false, message: 'Quiz not found' };
    }
    
    const newQuestion = {
      id: `q-${Date.now()}`,
      text: data.text,
      options: data.options.map((opt, i) => ({
        id: `opt-${Date.now()}-${i}`,
        text: opt.text,
      })),
      correctOptionId: `opt-${Date.now()}-${data.correctOptionIndex}`,
      points: data.points,
    };
    
    quiz.questions.push(newQuestion);
    
    return {
      success: true,
      message: 'Question added successfully',
    };
    
    // Production implementation:
    // const response = await fetch(`${API_BASE_URL}/admin/questions`, {
    //   method: 'POST',
    //   headers: getAuthHeaders(),
    //   body: JSON.stringify(data),
    // });
    // return response.json();
  },

  /**
   * Get all student results (Admin only)
   * GET /api/admin/results
   */
  async getStudentResults(): Promise<StudentResult[]> {
    await delay(300);
    return mockStudentResults;
    
    // Production implementation:
    // const response = await fetch(`${API_BASE_URL}/admin/results`, {
    //   headers: getAuthHeaders(),
    // });
    // const result = await response.json();
    // return result.data;
  },

  /**
   * Get all quizzes (Admin only)
   * GET /api/admin/quizzes
   */
  async getQuizzes(): Promise<Quiz[]> {
    await delay(300);
    return mockQuizzes;
  },
};

// Export all APIs
export const api = {
  auth: authApi,
  courses: courseApi,
  quiz: quizApi,
  admin: adminApi,
};

export default api;
