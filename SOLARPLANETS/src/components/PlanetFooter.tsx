import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, Info, Zap, Globe2, Star, Orbit } from 'lucide-react';
import { planetData } from '../data/planetData';

interface PlanetFooterProps {
  isDarkMode: boolean;
  currentPlanet?: string | null;
}

export const PlanetFooter: React.FC<PlanetFooterProps> = ({ isDarkMode, currentPlanet }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const themeColors = isDarkMode ? {
    bg: 'bg-slate-900/95',
    border: 'border-slate-700/50',
    text: 'text-white',
    textSecondary: 'text-gray-300',
    cardBg: 'bg-slate-800/50',
    cardBorder: 'border-slate-700/30',
    gradient: 'from-slate-800/80 to-slate-900/80'
  } : {
    bg: 'bg-white/95',
    border: 'border-gray-200/50',
    text: 'text-gray-900',
    textSecondary: 'text-gray-600',
    cardBg: 'bg-gray-50/50',
    cardBorder: 'border-gray-200/30',
    gradient: 'from-white/80 to-gray-50/80'
  };

  // Enhanced planet information database
  const planetInfo = {
    Sun: {
      name: 'Sun ☀️',
      type: 'Star',
      description: 'The magnificent center of our solar system - a massive star that provides light and heat to all planets.',
      facts: [
        'Temperature: ~5,778K surface',
        'Diameter: 1.39 million km',
        'Age: 4.6 billion years',
        'Mass: 99.86% of solar system'
      ],
      funFact: 'The Sun is so large that about 1.3 million Earths could fit inside it!',
      color: '#FFD700',
      distance: '0 AU',
      moons: 0,
      dayLength: '25-35 Earth days'
    },
    Mercury: {
      name: 'Mercury ☿️',
      type: 'Terrestrial Planet',
      description: 'The smallest and innermost planet with extreme temperature variations.',
      facts: [
        'Closest planet to Sun',
        'No atmosphere or moons',
        'Day length: 88 Earth days',
        'Temperature: -173°C to 427°C'
      ],
      funFact: 'A year on Mercury is shorter than a day on Mercury!',
      color: '#B8860B',
      distance: '0.39 AU',
      moons: 0,
      dayLength: '176 Earth days'
    },
    Venus: {
      name: 'Venus ♀️',
      type: 'Terrestrial Planet',
      description: 'The hottest planet with a thick, toxic atmosphere of carbon dioxide.',
      facts: [
        'Hottest planet in solar system',
        'Thick CO₂ atmosphere',
        'Retrograde rotation',
        'Surface pressure: 90x Earth'
      ],
      funFact: 'Venus rotates backwards compared to most planets!',
      color: '#FF6B35',
      distance: '0.72 AU',
      moons: 0,
      dayLength: '243 Earth days'
    },
    Earth: {
      name: 'Earth 🌍',
      type: 'Terrestrial Planet',
      description: 'Our beautiful home planet - the only known world with life.',
      facts: [
        'Perfect distance from Sun',
        '71% water coverage',
        'Protective magnetic field',
        'One natural satellite (Moon)'
      ],
      funFact: 'Earth is the only planet not named after a Roman or Greek god!',
      color: '#4A90E2',
      distance: '1.00 AU',
      moons: 1,
      dayLength: '24 hours'
    },
    Mars: {
      name: 'Mars ♂️',
      type: 'Terrestrial Planet',
      description: 'The red planet with the largest volcano in the solar system.',
      facts: [
        'Iron oxide gives red color',
        'Polar ice caps',
        'Largest volcano: Olympus Mons',
        'Two small moons: Phobos & Deimos'
      ],
      funFact: 'A day on Mars is almost the same as Earth - 24 hours 37 minutes!',
      color: '#E74C3C',
      distance: '1.52 AU',
      moons: 2,
      dayLength: '24h 37m'
    },
    Jupiter: {
      name: 'Jupiter ♃',
      type: 'Gas Giant',
      description: 'The largest planet with a Great Red Spot storm larger than Earth.',
      facts: [
        'Largest planet in solar system',
        '95+ known moons',
        'Great Red Spot storm',
        'Protects inner planets'
      ],
      funFact: 'Jupiter has more than twice the mass of all other planets combined!',
      color: '#F39C12',
      distance: '5.20 AU',
      moons: 95,
      dayLength: '9h 56m'
    },
    Saturn: {
      name: 'Saturn ♄',
      type: 'Gas Giant',
      description: 'Famous for its spectacular ring system made of ice and rock.',
      facts: [
        'Beautiful ring system',
        '146+ known moons',
        'Less dense than water',
        'Hexagonal storm at north pole'
      ],
      funFact: 'Saturn would float in water if there was a bathtub big enough!',
      color: '#F1C40F',
      distance: '9.58 AU',
      moons: 146,
      dayLength: '10h 42m'
    },
    Uranus: {
      name: 'Uranus ♅',
      type: 'Ice Giant',
      description: 'An ice giant that uniquely rotates on its side.',
      facts: [
        'Tilted 98° on its side',
        'Ice giant composition',
        'Faint ring system',
        'Methane gives blue color'
      ],
      funFact: 'Uranus rotates on its side, so its poles get more sunlight than its equator!',
      color: '#00D4AA',
      distance: '19.22 AU',
      moons: 27,
      dayLength: '17h 14m'
    },
    Neptune: {
      name: 'Neptune ♆',
      type: 'Ice Giant',
      description: 'The windiest planet with supersonic winds up to 2,100 km/h.',
      facts: [
        'Strongest winds in solar system',
        'Deep blue methane atmosphere',
        '16+ known moons',
        'Furthest planet from Sun'
      ],
      funFact: 'Neptune has the fastest winds in the solar system, reaching 2,100 km/h!',
      color: '#3742FA',
      distance: '30.05 AU',
      moons: 16,
      dayLength: '16h 6m'
    }
  };

  const allPlanets = ['Sun', ...planetData.map(p => p.name)];

  // Auto-sliding effect
  useEffect(() => {
    if (!isAutoSliding) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % allPlanets.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoSliding, allPlanets.length]);

  // Update current planet when hovered
  useEffect(() => {
    if (currentPlanet && allPlanets.includes(currentPlanet)) {
      const index = allPlanets.indexOf(currentPlanet);
      setCurrentIndex(index);
      setIsAutoSliding(false);
      
      const timeout = setTimeout(() => {
        setIsAutoSliding(true);
      }, 12000);

      return () => clearTimeout(timeout);
    }
  }, [currentPlanet, allPlanets]);

  const currentPlanetData = planetInfo[allPlanets[currentIndex] as keyof typeof planetInfo];

  const nextPlanet = () => {
    setCurrentIndex((prev) => (prev + 1) % allPlanets.length);
    setIsAutoSliding(false);
  };

  const prevPlanet = () => {
    setCurrentIndex((prev) => (prev - 1 + allPlanets.length) % allPlanets.length);
    setIsAutoSliding(false);
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 ${themeColors.bg} backdrop-blur-xl border-t-2 ${themeColors.border} z-40 transition-all duration-500 ${isExpanded ? 'h-96 sm:h-80 md:h-96' : 'h-16 sm:h-20'}`}>
      {/* Enhanced Header Bar with 3D Planet */}
      <div className="flex items-center justify-between h-16 sm:h-20 px-2 sm:px-4 md:px-6">
        <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
          {/* 3D Planet Sphere */}
          <div className="relative flex-shrink-0">
            <div 
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full shadow-2xl border-2 border-white/30 relative transform transition-all duration-500 hover:scale-110 hover:rotate-12 planet-sphere"
              style={{ 
                backgroundColor: currentPlanetData.color,
                boxShadow: `0 0 30px ${currentPlanetData.color}80, inset 0 0 20px rgba(255,255,255,0.3), 0 8px 32px rgba(0,0,0,0.3)`
              }}
            >
              {/* 3D Lighting Effect */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.8), rgba(255,255,255,0.3) 40%, transparent 70%)`
                }}
              />
              {/* Atmospheric Glow */}
              <div 
                className="absolute -inset-2 rounded-full opacity-60 animate-pulse"
                style={{
                  background: `radial-gradient(circle, ${currentPlanetData.color}40, transparent 70%)`
                }}
              />
              {/* Orbital Ring for Gas Giants */}
              {(currentPlanetData.name.includes('Saturn') || currentPlanetData.name.includes('Jupiter')) && (
                <div 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border border-white/20 rounded-full animate-spin"
                  style={{ animationDuration: '20s' }}
                />
              )}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-sm sm:text-base md:text-lg font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent truncate">
              {currentPlanetData.name}
            </h3>
            <p className={`text-xs sm:text-sm ${themeColors.textSecondary} font-medium truncate`}>
              {currentPlanetData.type} • {currentPlanetData.distance} from Sun
            </p>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 flex-shrink-0">
          <button
            onClick={prevPlanet}
            className={`p-1.5 sm:p-2 rounded-xl ${themeColors.cardBg} border ${themeColors.cardBorder} hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
            aria-label="Previous planet"
          >
            <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 rotate-90" />
          </button>
          <button
            onClick={nextPlanet}
            className={`p-1.5 sm:p-2 rounded-xl ${themeColors.cardBg} border ${themeColors.cardBorder} hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
            aria-label="Next planet"
          >
            <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4 rotate-90" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`p-1.5 sm:p-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
            aria-label={isExpanded ? "Collapse details" : "Expand details"}
          >
            {isExpanded ? <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" /> : <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4" />}
          </button>
        </div>
      </div>

      {/* Enhanced Expanded Content with 3D Cards */}
      {isExpanded && (
        <div className="px-2 sm:px-4 md:px-6 pb-4 sm:pb-6 h-72 sm:h-56 md:h-72 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {/* 3D About Card */}
            <div 
              className={`${themeColors.cardBg} border ${themeColors.cardBorder} rounded-2xl p-3 sm:p-4 md:p-6 backdrop-blur-sm transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 shadow-xl hover:shadow-2xl lg:col-span-2 card-3d`}
              style={{
                background: `linear-gradient(135deg, ${themeColors.gradient})`,
                boxShadow: isDarkMode 
                  ? '0 20px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)' 
                  : '0 20px 40px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)'
              }}
              onMouseEnter={() => setHoveredCard('about')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                <div className={`p-1.5 sm:p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 transform transition-all duration-300 ${hoveredCard === 'about' ? 'rotate-12 scale-110' : ''}`}>
                  <Info className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
                </div>
                <h4 className={`text-sm sm:text-base md:text-lg font-bold ${themeColors.text}`}>About {currentPlanetData.name}</h4>
              </div>
              <p className={`${themeColors.textSecondary} leading-relaxed mb-3 sm:mb-4 text-xs sm:text-sm md:text-base`}>
                {currentPlanetData.description}
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className={`p-2 sm:p-3 rounded-xl ${isDarkMode ? 'bg-blue-900/30 border-blue-800/30' : 'bg-blue-100/50 border-blue-200/50'} border`}>
                  <div className="flex items-center space-x-1 sm:space-x-2 mb-1">
                    <Orbit className="w-2 h-2 sm:w-3 sm:h-3 text-blue-500" />
                    <span className={`text-xs font-bold ${themeColors.text}`}>Distance</span>
                  </div>
                  <p className={`text-xs ${themeColors.textSecondary}`}>{currentPlanetData.distance}</p>
                </div>
                <div className={`p-2 sm:p-3 rounded-xl ${isDarkMode ? 'bg-green-900/30 border-green-800/30' : 'bg-green-100/50 border-green-200/50'} border`}>
                  <div className="flex items-center space-x-1 sm:space-x-2 mb-1">
                    <Star className="w-2 h-2 sm:w-3 sm:h-3 text-green-500" />
                    <span className={`text-xs font-bold ${themeColors.text}`}>Moons</span>
                  </div>
                  <p className={`text-xs ${themeColors.textSecondary}`}>{currentPlanetData.moons}</p>
                </div>
              </div>

              {/* Fun Fact */}
              <div className={`p-3 sm:p-4 ${isDarkMode ? 'bg-yellow-900/30 border-yellow-800/30' : 'bg-yellow-100/50 border-yellow-200/50'} rounded-xl border`}>
                <div className="flex items-center space-x-1 sm:space-x-2 mb-2">
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                  <span className={`text-xs sm:text-sm font-bold ${themeColors.text}`}>Fun Fact</span>
                </div>
                <p className={`text-xs sm:text-sm ${themeColors.textSecondary} italic`}>
                  {currentPlanetData.funFact}
                </p>
              </div>
            </div>

            {/* 3D Facts Card */}
            <div 
              className={`${themeColors.cardBg} border ${themeColors.cardBorder} rounded-2xl p-3 sm:p-4 md:p-6 backdrop-blur-sm transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 shadow-xl hover:shadow-2xl card-3d`}
              style={{
                background: `linear-gradient(135deg, ${themeColors.gradient})`,
                boxShadow: isDarkMode 
                  ? '0 20px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)' 
                  : '0 20px 40px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)'
              }}
              onMouseEnter={() => setHoveredCard('facts')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                <div className={`p-1.5 sm:p-2 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 transform transition-all duration-300 ${hoveredCard === 'facts' ? 'rotate-12 scale-110' : ''}`}>
                  <Globe2 className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
                </div>
                <h4 className={`text-sm sm:text-base md:text-lg font-bold ${themeColors.text}`}>Key Facts</h4>
              </div>
              <div className="space-y-2 sm:space-y-3">
                {currentPlanetData.facts.map((fact, index) => (
                  <div key={index} className="flex items-start space-x-2 sm:space-x-3 group">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 mt-1.5 sm:mt-2 flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                    <span className={`text-xs sm:text-sm ${themeColors.textSecondary} leading-relaxed group-hover:text-blue-400 transition-colors duration-300`}>
                      {fact}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Day Length Info */}
              <div className={`mt-3 sm:mt-4 p-2 sm:p-3 rounded-xl ${isDarkMode ? 'bg-purple-900/30 border-purple-800/30' : 'bg-purple-100/50 border-purple-200/50'} border`}>
                <div className="flex items-center space-x-1 sm:space-x-2 mb-1">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-500"></div>
                  <span className={`text-xs font-bold ${themeColors.text}`}>Day Length</span>
                </div>
                <p className={`text-xs ${themeColors.textSecondary}`}>{currentPlanetData.dayLength}</p>
              </div>
            </div>
          </div>

          {/* Enhanced Planet Navigation Dots */}
          <div className="flex justify-center space-x-1 sm:space-x-2 mt-4 sm:mt-6 flex-wrap gap-1 sm:gap-2">
            {allPlanets.map((planet, index) => {
              const planetData = planetInfo[planet as keyof typeof planetInfo];
              return (
                <button
                  key={planet}
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsAutoSliding(false);
                  }}
                  className={`relative group transition-all duration-300 ${
                    index === currentIndex 
                      ? 'scale-125' 
                      : 'hover:scale-110'
                  }`}
                  title={planet}
                >
                  <div 
                    className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-white/30 transition-all duration-300 planet-sphere ${
                      index === currentIndex 
                        ? 'shadow-lg' 
                        : 'opacity-70 hover:opacity-100'
                    }`}
                    style={{ 
                      backgroundColor: planetData.color,
                      boxShadow: index === currentIndex 
                        ? `0 0 20px ${planetData.color}80, inset 0 0 10px rgba(255,255,255,0.3)` 
                        : `0 0 10px ${planetData.color}40`
                    }}
                  >
                    <div 
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6), transparent 60%)`
                      }}
                    />
                  </div>
                  {/* Tooltip */}
                  <div className={`absolute -top-6 sm:-top-8 left-1/2 transform -translate-x-1/2 px-1 sm:px-2 py-0.5 sm:py-1 ${themeColors.cardBg} border ${themeColors.cardBorder} rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10`}>
                    {planet}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Enhanced Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-200/20 to-gray-300/20">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-100 relative overflow-hidden progress-bar"
          style={{ 
            width: isAutoSliding ? `${((Date.now() % 5000) / 5000) * 100}%` : '0%'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
        </div>
      </div>
    </div>
  );
};