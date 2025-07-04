import React from 'react';
import {  Heart } from 'lucide-react';

interface FooterProps {
  isDarkMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isDarkMode }) => {
  const themeColors = isDarkMode ? {
    bg: 'bg-black-/98',
    border: 'border-slate-700/50',
    text: 'text-white',
    textSecondary: 'text-gray-300',
    textMuted: 'text-gray-400',
    hover: 'hover:text-blue-400',
    cardBg: 'bg-slate-800/50'
  } : {
    bg: 'bg-white/98',
    border: 'border-gray-200/50',
    text: 'text-gray-900',
    textSecondary: 'text-gray-700',
    textMuted: 'text-gray-500',
    hover: 'hover:text-blue-600',
    cardBg: 'bg-gray-50/50'
  };


 

  return (
    <footer className={`${themeColors.bg} border-t-2 ${themeColors.border} backdrop-blur-xl`}>
      {/* Main Footer Content */}
      

      {/* Newsletter Section */}
      <div className={`border-t ${themeColors.border} py-8`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`${themeColors.cardBg} border ${themeColors.border} rounded-2xl p-8 text-center`}>
            <h3 className={`text-xl font-bold ${themeColors.text} mb-4`}>
              Stay Updated with Space Discoveries
            </h3>
            <p className={`${themeColors.textSecondary} mb-6 max-w-2xl mx-auto`}>
              Get the latest updates about new features, space facts, and cosmic discoveries delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className={`flex-1 px-4 py-3 rounded-xl border ${themeColors.border} ${themeColors.cardBg} ${themeColors.text} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
              />
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className={`border-t ${themeColors.border} py-6`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className={`${themeColors.textMuted} text-sm flex items-center space-x-2`}>
              <span>© 2024 Solar System 3D. Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>for space enthusiasts.</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className={`${themeColors.textMuted} ${themeColors.hover} transition-colors duration-300`}>
                Privacy Policy
              </a>
              <a href="#" className={`${themeColors.textMuted} ${themeColors.hover} transition-colors duration-300`}>
                Terms of Service
              </a>
              <a href="#" className={`${themeColors.textMuted} ${themeColors.hover} transition-colors duration-300`}>
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-20"></div>
      <div className="absolute top-20 right-20 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-30"></div>
      <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce opacity-25"></div>
    </footer>
  );
};