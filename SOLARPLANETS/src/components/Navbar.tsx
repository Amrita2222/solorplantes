import React, { useState } from 'react';
import { Rocket, Github, Star, Globe, Settings, Menu, X, Home, Info, Link } from 'lucide-react';

interface NavbarProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  currentPage: 'home' | 'about';
  onPageChange: (page: 'home' | 'about') => void;
  isScrolled: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  isDarkMode, 
  onToggleTheme, 
  currentPage, 
  onPageChange,
  isScrolled 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const themeColors = isDarkMode ? {
    bg: isScrolled ? 'bg-black-900/98' : 'bg-slate-900/95',
    border: 'border-slate-700/50',
    text: 'text-white',
    textSecondary: 'text-gray-300',
    hover: 'hover:bg-slate-800/50',
    mobileMenu: 'bg-slate-900/98'
  } : {
    bg: isScrolled ? 'bg-white/98' : 'bg-white/95',
    border: 'border-gray-200/50',
    text: 'text-gray-900',
    textSecondary: 'text-gray-600',
    hover: 'hover:bg-gray-100/50',
    mobileMenu: 'bg-white/98'
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handlePageChange = (page: 'home' | 'about') => {
    onPageChange(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 ${themeColors.bg} backdrop-blur-xl border-b-2 ${themeColors.border} z-50 transition-all duration-500 ${isScrolled ? 'shadow-2xl' : 'shadow-lg'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Rocket className="w-8 h-8 text-blue-500 animate-pulse" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-ping"></div>
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Solar System 3D
                  </h1>
                  <p className={`text-xs ${themeColors.textSecondary} font-medium hidden sm:block`}>
                    Interactive Space Exploration
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              <button 
                onClick={() => handlePageChange('home')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl ${themeColors.hover} transition-all duration-300 ${themeColors.text} ${currentPage === 'home' ? 'bg-blue-500/20 text-blue-400' : ''}`}
              >
                <Home className="w-4 h-4" />
                <span className="text-sm font-medium">Home</span>
              </button>
              <button 
                onClick={() => handlePageChange('about')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl ${themeColors.hover} transition-all duration-300 ${themeColors.text} ${currentPage === 'about' ? 'bg-blue-500/20 text-blue-400' : ''}`}
              >
                <Info className="w-4 h-4" />
                <span className="text-sm font-medium">About</span>
              </button>
              <button className={`flex items-center space-x-2 px-4 py-2 rounded-xl ${themeColors.hover} transition-all duration-300 ${themeColors.text}`}>
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">Explore</span>
              </button>
              <button className={`flex items-center space-x-2 px-4 py-2 rounded-xl ${themeColors.hover} transition-all duration-300 ${themeColors.text}`}>
                <Star className="w-4 h-4" />
                <span className="text-sm font-medium">Favorites</span>
              </button>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              <button className={`hidden sm:flex items-center space-x-2 px-4 py-2 rounded-xl ${themeColors.hover} transition-all duration-300 ${themeColors.text}`}>
                <Github className="w-4 h-4" />
                <span className="hidden lg:inline text-sm font-medium">
                  <Link href=''>GitHub</Link>
                </span>
              </button>
              
              <div className={`hidden sm:block w-px h-6 ${themeColors.border} border-l`}></div>
              
              <div className="flex items-center space-x-2">
                <span className={`hidden sm:inline text-sm font-medium ${themeColors.textSecondary}`}>
                  {isDarkMode ? 'Dark' : 'Light'}
                </span>
                <button
                  onClick={onToggleTheme}
                  className={`relative w-12 h-6 ${isDarkMode ? 'bg-blue-600' : 'bg-gray-300'} rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                >
                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${isDarkMode ? 'translate-x-6' : 'translate-x-0'} shadow-lg`}></div>
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className={`md:hidden p-2 rounded-xl ${themeColors.hover} transition-all duration-300 ${themeColors.text}`}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className={`${themeColors.mobileMenu} backdrop-blur-xl border-t ${themeColors.border} px-4 py-6 space-y-4`}>
            <button 
              onClick={() => handlePageChange('home')}
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl ${themeColors.hover} transition-all duration-300 ${themeColors.text} ${currentPage === 'home' ? 'bg-blue-500/20 text-blue-400' : ''}`}
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Home</span>
            </button>
            <button 
              onClick={() => handlePageChange('about')}
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl ${themeColors.hover} transition-all duration-300 ${themeColors.text} ${currentPage === 'about' ? 'bg-blue-500/20 text-blue-400' : ''}`}
            >
              <Info className="w-5 h-5" />
              <span className="font-medium">About</span>
            </button>
            <button className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl ${themeColors.hover} transition-all duration-300 ${themeColors.text}`}>
              <Globe className="w-5 h-5" />
              <span className="font-medium">Explore</span>
            </button>
            <button className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl ${themeColors.hover} transition-all duration-300 ${themeColors.text}`}>
              <Star className="w-5 h-5" />
              <span className="font-medium">Favorites</span>
            </button>
            <button className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl ${themeColors.hover} transition-all duration-300 ${themeColors.text}`}>
              <Github className="w-5 h-5" />
              <span className="font-medium">GitHub</span>
            </button>
            <button className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl ${themeColors.hover} transition-all duration-300 ${themeColors.text}`}>
              <Settings className="w-5 h-5" />
              <span className="font-medium">Settings</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};