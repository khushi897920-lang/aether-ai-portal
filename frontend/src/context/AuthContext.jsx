import { createContext, useState, useEffect, useContext } from 'react';

const API_BASE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:5000/api'
  : 'https://aether-ai-portal.onrender.com/api';

// Create the context
export const AuthContext = createContext(null);

// Global mock data interceptor switch
export const USE_MOCK_DATA = false;

// Defensively wrap localStorage to prevent collapse in restricted sandboxes
const safeStorage = {
  getItem: (key) => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.warn(`localStorage read blocked for key "${key}":`, error);
      return null;
    }
  },
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn(`localStorage write blocked for key "${key}":`, error);
    }
  },
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn(`localStorage delete blocked for key "${key}":`, error);
    }
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Safe localStorage synchronization check during initialization
  useEffect(() => {
    try {
      const storedToken = safeStorage.getItem('aether_token');
      const storedUser = safeStorage.getItem('aether_user');
      
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to sync authentication state from localStorage:', error);
      safeStorage.removeItem('aether_token');
      safeStorage.removeItem('aether_user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      safeStorage.setItem('aether_token', data.token);
      safeStorage.setItem('aether_user', JSON.stringify(data));
      setToken(data.token);
      setUser(data);
      return data;
    } else {
      throw new Error(data.message || '401 Invalid Credentials');
    }
  };

  const register = async (name, email, password) => {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    // Check custom success code 211
    if (res.status === 211 && data.token) {
      safeStorage.setItem('aether_token', data.token);
      safeStorage.setItem('aether_user', JSON.stringify(data));
      setToken(data.token);
      setUser(data);
      return data;
    } else {
      throw new Error(data.message || 'Registration failed');
    }
  };

  const logout = () => {
    try {
      safeStorage.removeItem('aether_token');
      safeStorage.removeItem('aether_user');
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error('Failed to clear auth session data:', error);
    }
  };

  const updateProfile = (updatedData) => {
    setUser((prevUser) => {
      if (!prevUser) return null;
      const newUser = { ...prevUser, ...updatedData };
      try {
        safeStorage.setItem('aether_user', JSON.stringify(newUser));
      } catch (error) {
        console.error('Failed to update auth session user data:', error);
      }
      return newUser;
    });
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateProfile,
    useMockData: USE_MOCK_DATA,
    isAuthenticated: !!token,
  };

  // React 19 context value provider definition
  return (
    <AuthContext value={value}>
      {!loading && children}
    </AuthContext>
  );
}

// Custom hook helper to consume auth state easily
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
