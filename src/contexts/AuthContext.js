import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Mock users for testing
const mockUsers = [
  { 
    id: 1, 
    username: 'gamer_pro', 
    email: 'gamer@example.com', 
    password: 'password123', // In a real app, this would be hashed
    role: 'streamer', 
    followers: 15420, 
    following: 234, 
    bio: 'Professional gamer and content creator', 
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
    followingUsers: [3, 4],
    streamerInfo: {
      startDate: '2020-05-15',
      totalViews: 1250000
    }
  },
  { 
    id: 2, 
    username: 'viewer123', 
    email: 'viewer@example.com', 
    password: 'password123', // In a real app, this would be hashed
    role: 'viewer', 
    followers: 120, 
    following: 45, 
    bio: 'Casual gamer and stream enthusiast', 
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    followingUsers: [1, 3]
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState(mockUsers);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    const storedUsers = localStorage.getItem('users');
    
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (email, password) => {
    // Find user with matching email and password
    const foundUser = users.find(
      u => u.email === email && u.password === password
    );

    if (foundUser) {
      // Remove password from user object before storing
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      return { success: true };
    }

    return { 
      success: false, 
      error: 'Invalid email or password' 
    };
  };

  const signup = (userData) => {
    // Validate required fields
    if (!userData.username || !userData.email || !userData.password) {
      return {
        success: false,
        error: 'All fields are required'
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      return {
        success: false,
        error: 'Invalid email format'
      };
    }

    // Validate password length
    if (userData.password.length < 6) {
      return {
        success: false,
        error: 'Password must be at least 6 characters long'
      };
    }

    // Check if email already exists
    if (users.some(u => u.email === userData.email)) {
      return { 
        success: false, 
        error: 'Email already exists' 
      };
    }

    // Check if username already exists
    if (users.some(u => u.username === userData.username)) {
      return {
        success: false,
        error: 'Username already taken'
      };
    }

    // Create new user
    const newUser = {
      id: users.length + 1,
      ...userData,
      followers: 0,
      following: 0,
      followingUsers: [],
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
      bio: userData.bio || '',
      streamerInfo: userData.role === 'streamer' ? {
        startDate: new Date().toISOString(),
        totalViews: 0
      } : null
    };

    // Add new user to users array
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Remove password from user object before storing
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 