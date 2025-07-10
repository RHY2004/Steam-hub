import React from 'react';
import { Search, User, Settings, LogOut } from 'lucide-react';
import { useRouter } from './Router';
import { useAuth } from '../contexts/AuthContext';
import { Link } from './Router';

export const Header = () => {
  const { navigate } = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-white text-xl font-bold">
              StreamHub
            </Link>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search streams..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md leading-5 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to={`/profile/${user.id}`}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                >
                  <User className="h-5 w-5" />
                  <span>{user.username}</span>
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                >
                  <Settings className="h-5 w-5" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
                >
                  Sign Up
                </Link>
              </>
            )}
            <Link
              to="/developed-by"
              className="text-gray-300 hover:text-white"
            >
              Developed By
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}; 