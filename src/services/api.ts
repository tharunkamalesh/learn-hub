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
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: data.name,
        email: data.email,
        password: data.password
      }),
    });
    const result = await response.json();
    if (result.token) setToken(result.token);
    
    // Map backend user response to frontend User type
    if (result.user) {
      result.user = {
        id: result.user.id,
        email: result.user.email,
        name: result.user.username, // Map username to name
        role: result.user.role,
        createdAt: result.user.createdAt || new Date().toISOString()
      };
    }
    
    return result;
  },

  /**
   * Login (Student or Admin)
   * POST /api/auth/login
   */
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.token) setToken(result.token);
    
    // Map backend user response to frontend User type
    if (result.user) {
      result.user = {
        id: result.user.id,
        email: result.user.email,
        name: result.user.username, // Map username to name
        role: result.user.role,
        createdAt: result.user.createdAt || new Date().toISOString()
      };
    }
    
    return result;
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
    
    // Since backend doesn't have a /auth/me endpoint, we'll decode the token to get user info
    try {
      // Decode JWT token to extract user info
      const tokenPayload = authToken.split('.')[1];
      const decodedPayload = JSON.parse(atob(tokenPayload));
      
      return {
        id: decodedPayload.id,
        email: decodedPayload.email,
        name: decodedPayload.name || decodedPayload.username,
        role: decodedPayload.role,
        createdAt: decodedPayload.createdAt || new Date().toISOString()
      };
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
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
    const response = await fetch(`${API_BASE_URL}/courses`, {
      headers: getAuthHeaders(),
    });
    const result = await response.json();
    // Backend returns courses array directly in result.courses
    return result.courses || result.data || [];
  },

  /**
   * Get course by ID
   * GET /api/courses/:id
   */
  async getCourseById(id: string): Promise<Course | null> {
    const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
      headers: getAuthHeaders(),
    });
    const result = await response.json();
    // Backend returns single course in result.course
    return result.course || result.data;
  },

  /**
   * Get quiz for a course
   * GET /api/courses/:id/quiz
   */
  async getCourseQuiz(courseId: string): Promise<Quiz | null> {
    // Backend has a different endpoint structure
    // Since our backend doesn't have /courses/:id/quiz, we'll need to get all quizzes and filter
    // or we can try to fetch quiz by courseId in a different way
    // For now, returning null since the backend doesn't support this endpoint
    return null;
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
    const response = await fetch(`${API_BASE_URL}/quizzes/${quizId}/attempt`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        answers: attempt.answers.map(a => a.selectedOptionId)
      }),
    });
    const result = await response.json();
    // Backend returns result in result.result
    return {
      success: result.success,
      message: result.message,
      data: result.result || result.data
    };
  },

  /**
   * Get user's quiz results
   * GET /api/results
   */
  async getResults(): Promise<QuizResult[]> {
    const response = await fetch(`${API_BASE_URL}/results`, {
      headers: getAuthHeaders(),
    });
    const result = await response.json();
    return result.results || result.data || [];
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
    const response = await fetch(`${API_BASE_URL}/admin/courses`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return await response.json();
  },

  /**
   * Add question to quiz
   * POST /api/admin/questions
   */
  async addQuestion(data: CreateQuestionRequest): Promise<ApiResponse<null>> {
    const response = await fetch(`${API_BASE_URL}/admin/questions`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return await response.json();
  },

  /**
   * Get all student results (Admin only)
   * GET /api/admin/results
   */
  async getStudentResults(): Promise<StudentResult[]> {
    const response = await fetch(`${API_BASE_URL}/admin/results`, {
      headers: getAuthHeaders(),
    });
    const result = await response.json();
    return result.results || result.data || [];
  },

  /**
   * Get all quizzes (Admin only)
   * GET /api/admin/quizzes
   */
  async getQuizzes(): Promise<Quiz[]> {
    // Backend doesn't have this endpoint, returning empty array
    return [];
  },

  /**
   * Get all available guides
   * GET /api/guides
   */
  async getGuides(): Promise<any[]> {
    const response = await fetch(`${API_BASE_URL}/guides`, {
      headers: getAuthHeaders(),
    });
    const result = await response.json();
    return result.guides || result.data || [];
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
