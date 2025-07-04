import React, { useEffect, useRef, useState } from 'react';
import { SolarSystemScene } from '../utils/SolarSystemScene';
import { ControlPanel } from './ControlPanel';
import { PlanetFooter } from './PlanetFooter';
import { planetData } from '../data/planetData';

interface SolarSystemProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const SolarSystem: React.FC<SolarSystemProps> = ({ isDarkMode, onToggleTheme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<SolarSystemScene | null>(null);
  const [speeds, setSpeeds] = useState<{ [key: string]: number }>(() => {
    const initialSpeeds: { [key: string]: number } = {};
    planetData.forEach(planet => {
      initialSpeeds[planet.name] = 1;
    });
    return initialSpeeds;
  });
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize the solar system scene
    sceneRef.current = new SolarSystemScene(canvasRef.current);
    
    // Set up planet hover callback
    sceneRef.current.setOnPlanetHover(setHoveredPlanet);

    // Handle window resize
    const handleResize = () => {
      if (sceneRef.current) {
        sceneRef.current.onWindowResize();
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (sceneRef.current) {
        sceneRef.current.dispose();
      }
    };
  }, []);

  // Sync theme with scene
  useEffect(() => {
    if (sceneRef.current && sceneRef.current.isDarkModeActive() !== isDarkMode) {
      sceneRef.current.toggleTheme();
    }
  }, [isDarkMode]);

  const handleSpeedChange = (planetName: string, speed: number) => {
    setSpeeds(prev => ({ ...prev, [planetName]: speed }));
    if (sceneRef.current) {
      sceneRef.current.updatePlanetSpeed(planetName, speed);
    }
  };

  const handleTogglePause = () => {
    if (sceneRef.current) {
      sceneRef.current.togglePause();
      setIsPaused(sceneRef.current.isPausedState());
    }
  };

  const handleReset = () => {
    const resetSpeeds: { [key: string]: number } = {};
    planetData.forEach(planet => {
      resetSpeeds[planet.name] = 1;
      if (sceneRef.current) {
        sceneRef.current.updatePlanetSpeed(planet.name, 1);
      }
    });
    setSpeeds(resetSpeeds);
  };

  const canvasStyle = isDarkMode
    ? { background: 'radial-gradient(ellipse at center, #1e1b4b 0%, #0f0f23 50%, #000000 100%)' }
    : { background: 'radial-gradient(ellipse at center, #E8F4FD 0%, #D1E7FF 50%, #B8DAFF 100%)' };

  // Get planet info for tooltip
  const getPlanetInfo = (planetName: string) => {
    if (planetName === 'Sun') {
      return {
        name: 'Sun ☀️',
        description: 'The magnificent center of our solar system - a massive star that provides light and heat to all planets.',
        facts: 'Temperature: ~5,778K • Diameter: 1.39 million km • Age: 4.6 billion years',
        color: '#FFD700'
      };
    }
    
    const planet = planetData.find(p => p.name === planetName);
    if (!planet) return null;

    const planetInfo: { [key: string]: any } = {
      Mercury: {
        name: 'Mercury ☿️',
        description: 'The smallest and innermost planet with extreme temperature variations.',
        facts: 'Closest to Sun • No atmosphere • Day: 88 Earth days',
        color: planet.color
      },
      Venus: {
        name: 'Venus ♀️',
        description: 'The hottest planet with a thick, toxic atmosphere of carbon dioxide.',
        facts: 'Hottest planet • Thick CO₂ atmosphere • Retrograde rotation',
        color: planet.color
      },
      Earth: {
        name: 'Earth 🌍',
        description: 'Our beautiful home planet - the only known world with life.',
        facts: 'Perfect distance from Sun • 71% water • Protective atmosphere',
        color: planet.color
      },
      Mars: {
        name: 'Mars ♂️',
        description: 'The red planet with the largest volcano in the solar system.',
        facts: 'Iron oxide surface • Polar ice caps • Potential for past life',
        color: planet.color
      },
      Jupiter: {
        name: 'Jupiter ♃',
        description: 'The largest planet with a Great Red Spot storm larger than Earth.',
        facts: 'Gas giant • 95+ moons • Protects inner planets from asteroids',
        color: planet.color
      },
      Saturn: {
        name: 'Saturn ♄',
        description: 'Famous for its spectacular ring system made of ice and rock.',
        facts: 'Beautiful rings • 146+ moons • Less dense than water',
        color: planet.color
      },
      Uranus: {
        name: 'Uranus ♅',
        description: 'An ice giant that uniquely rotates on its side.',
        facts: 'Tilted 98° • Ice giant • Faint ring system • Methane atmosphere',
        color: planet.color
      },
      Neptune: {
        name: 'Neptune ♆',
        description: 'The windiest planet with supersonic winds up to 2,100 km/h.',
        facts: 'Strongest winds • Deep blue color • 16+ moons • Furthest planet',
        color: planet.color
      }
    };

    return planetInfo[planetName];
  };

  const planetInfo = hoveredPlanet ? getPlanetInfo(hoveredPlanet) : null;

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Main Canvas - Responsive sizing */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full transition-all duration-700 cursor-pointer"
        style={{ 
          ...canvasStyle, 
          marginTop: '64px', 
          height: 'calc(100vh - 144px)',
          minHeight: '300px'
        }}
      />
      
      {/* Control Panel - Responsive positioning */}
      <div className="fixed top-20 left-1 sm:left-2 md:left-4 z-30 max-w-xs sm:max-w-sm">
        <ControlPanel
          onSpeedChange={handleSpeedChange}
          onTogglePause={handleTogglePause}
          onToggleTheme={onToggleTheme}
          onReset={handleReset}
          isPaused={isPaused}
          isDarkMode={isDarkMode}
          speeds={speeds}
        />
      </div>

      {/* Enhanced Planet Hover Tooltip - Responsive */}
      {planetInfo && (
        <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isDarkMode ? 'bg-slate-900/95 border-slate-600/50' : 'bg-white/95 border-gray-300/50'} backdrop-blur-xl border-2 rounded-3xl p-3 sm:p-6 md:p-8 shadow-2xl max-w-xs sm:max-w-md z-20 transition-all duration-500 animate-fadeIn pointer-events-none mx-2 sm:mx-4`}>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div 
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full shadow-lg border-2 border-white/30 relative planet-sphere" 
                style={{ 
                  backgroundColor: planetInfo.color,
                  boxShadow: `0 0 20px ${planetInfo.color}80, inset 0 0 15px rgba(255,255,255,0.3)`
                }}
              >
                <div 
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5), transparent 60%)`
                  }}
                />
              </div>
              <h3 className="text-lg sm:text-xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {planetInfo.name}
              </h3>
            </div>
            <p className={`text-xs sm:text-sm md:text-base ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} leading-relaxed mb-3 sm:mb-4 font-medium`}>
              {planetInfo.description}
            </p>
            <div className={`pt-3 sm:pt-4 border-t-2 ${isDarkMode ? 'border-slate-700/50' : 'border-gray-300/50'}`}>
              <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-semibold leading-relaxed`}>
                {planetInfo.facts}
              </p>
            </div>
          </div>
          
          {/* Enhanced tooltip arrow */}
          <div className={`absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6 ${isDarkMode ? 'bg-slate-900/95 border-slate-600/50' : 'bg-white/95 border-gray-300/50'} border-b-2 border-r-2 rotate-45 shadow-lg`}></div>
        </div>
      )}

      {/* Enhanced Info Panel - Responsive positioning */}
      <div className={`fixed top-20 right-1 sm:right-2 md:right-4 ${isDarkMode ? 'bg-slate-900/85 border-slate-600/40' : 'bg-white/90 border-gray-200/60'} backdrop-blur-xl border-2 rounded-3xl p-3 sm:p-4 md:p-6 shadow-2xl max-w-xs sm:max-w-sm z-10 transition-all duration-500`}>
        <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          🌌 Solar System
        </h3>
        <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed mb-3 sm:mb-4 font-medium`}>
          Experience our solar system in stunning 3D. Hover over planets for information, control speeds, and explore with interactive camera.
        </p>
        <div className={`mb-3 sm:mb-4 p-2 sm:p-3 ${isDarkMode ? 'bg-slate-800/40' : 'bg-gray-100/60'} rounded-2xl border ${isDarkMode ? 'border-slate-700/30' : 'border-gray-200/50'}`}>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} font-semibold text-center`}>
            ✨ Hover planets for details!
          </p>
        </div>
        <div className={`pt-3 sm:pt-4 border-t-2 ${isDarkMode ? 'border-slate-700/50' : 'border-gray-300/50'}`}>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} font-medium`}>
            Three.js • 3D Rendering • Real-time
          </p>
          <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'} mt-1`}>
            {isDarkMode ? '🌙 Dark' : '☀️ Light'} Mode
          </p>
        </div>
      </div>

      {/* Status Indicator - Responsive positioning */}
      <div className={`fixed bottom-20 sm:bottom-24 left-1/2 transform -translate-x-1/2 ${isDarkMode ? 'bg-slate-900/85 border-slate-600/40' : 'bg-white/90 border-gray-200/60'} backdrop-blur-xl border-2 rounded-full px-3 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 z-10 transition-all duration-500 shadow-lg mx-2 sm:mx-4`}>
        <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} flex items-center gap-1 sm:gap-2 md:gap-3 font-medium flex-wrap justify-center`}>
          <span className="animate-pulse text-sm sm:text-base md:text-lg">🌟</span>
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-bold whitespace-nowrap">
            3D Solar System
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">{isDarkMode ? 'Dark' : 'Light'} Mode</span>
          <span className="hidden sm:inline">•</span>
          <span className={`${isPaused ? 'text-red-400' : 'text-green-400'} whitespace-nowrap`}>
            {isPaused ? 'Paused' : 'Active'}
          </span>
          {hoveredPlanet && (
            <>
              <span className="hidden md:inline">•</span>
              <span className="font-semibold text-yellow-400 whitespace-nowrap">Viewing: {hoveredPlanet}</span>
            </>
          )}
        </p>
      </div>

      {/* 3D Planet Footer */}
      <PlanetFooter isDarkMode={isDarkMode} currentPlanet={hoveredPlanet} />
    </div>
  );
};