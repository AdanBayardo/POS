// authService.ts

import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/auth'; // Backend API base URL

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// Login user
export const login = async (loginData: LoginData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, loginData);
    const { token } = response.data;
    
    // Save token to localStorage or cookies
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }

    return token;  // Return token for further usage if needed
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

// Register user
export const register = async (registerData: RegisterData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, registerData);
    return response.data;  // Usually, this will return user info or success message
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

// Logout user
export const logout = () => {
  // Clear localStorage (or cookies if used)
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
};

// Get currently logged in user (if token exists)
export const getCurrentUser = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    return token;
  }
  return null;
};

// Attach the token to headers for protected routes
export const setAuthToken = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};
