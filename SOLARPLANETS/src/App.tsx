import React, { useState, useEffect } from 'react';
import { SolarSystem } from './components/SolarSystem';
import { AboutPage } from './components/AboutPage';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'about'>('home');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const backgroundClass = isDarkMode 
    ? 'bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900'
    : 'bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100';

  return (
    <div className={`min-h-screen ${backgroundClass} transition-all duration-700`}>
      <Navbar 
        isDarkMode={isDarkMode} 
        onToggleTheme={handleToggleTheme}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isScrolled={isScrolled}
      />
      
      <main className="relative">
        {currentPage === 'home' ? (
          <SolarSystem isDarkMode={isDarkMode} onToggleTheme={handleToggleTheme} />
        ) : (
          <AboutPage isDarkMode={isDarkMode} />
        )}
      </main>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}

export default App;