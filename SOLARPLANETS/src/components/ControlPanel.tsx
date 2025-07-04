import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { planetData } from '../data/planetData';
import { ThemeColors } from '../types/Planet';

interface ControlPanelProps {
  onSpeedChange: (planetName: string, speed: number) => void;
  onTogglePause: () => void;
  onReset: () => void;
  onToggleTheme: () => void;
  isPaused: boolean;
  isDarkMode: boolean;
  speeds: { [key: string]: number };
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  onSpeedChange,
  onTogglePause,
  onReset,
  isPaused,
  isDarkMode,
  speeds
}) => {
  const themeColors: ThemeColors = isDarkMode ? {
    background: 'bg-slate-900/85',
    panelBg: 'bg-slate-900/85',
    panelBorder: 'border-slate-600/40',
    textPrimary: 'text-white',
    textSecondary: 'text-gray-300',
    buttonBg: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700',
    buttonHover: 'hover:bg-slate-700/50',
    sliderTrack: 'bg-slate-700',
    sliderThumb: 'slider-dark'
  } : {
    background: 'bg-white/90',
    panelBg: 'bg-white/90',
    panelBorder: 'border-gray-200/60',
    textPrimary: 'text-gray-900',
    textSecondary: 'text-gray-700',
    buttonBg: 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700',
    buttonHover: 'hover:bg-gray-100/70',
    sliderTrack: 'bg-gray-300',
    sliderThumb: 'slider-light'
  };

  return (
    <div className={`${themeColors.panelBg} backdrop-blur-xl border-2 ${themeColors.panelBorder} rounded-3xl p-6 shadow-2xl max-w-sm w-full transition-all duration-500`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-xl font-bold ${themeColors.textPrimary} bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent`}>
          Planet Controls
        </h2>
        <div className="flex gap-2">
          <button
            onClick={onTogglePause}
            className={`flex items-center justify-center w-11 h-11 ${themeColors.buttonBg} rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg`}
            title={isPaused ? 'Resume' : 'Pause'}
          >
            {isPaused ? <Play size={20} className="text-white" /> : <Pause size={20} className="text-white" />}
          </button>
          <button
            onClick={onReset}
            className={`flex items-center justify-center w-11 h-11 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg`}
            title="Reset Speeds"
          >
            <RotateCcw size={20} className="text-white" />
          </button>
        </div>
      </div>

      <div className="space-y-4 max-h-80 overflow-y-auto custom-scrollbar">
        {planetData.map((planet) => (
          <div key={planet.name} className={`space-y-3 p-4 rounded-2xl ${isDarkMode ? 'bg-slate-800/30 hover:bg-slate-800/50' : 'bg-gray-50/50 hover:bg-gray-100/70'} transition-all duration-300 border ${isDarkMode ? 'border-slate-700/30' : 'border-gray-200/50'}`}>
            <div className="flex items-center justify-between">
              <span className={`text-sm font-semibold ${themeColors.textPrimary} flex items-center gap-3`}>
                <div 
                  className="w-5 h-5 rounded-full shadow-lg border-2 border-white/30 relative" 
                  style={{ 
                    backgroundColor: planet.color,
                    boxShadow: `0 0 15px ${planet.color}60, inset 0 0 10px rgba(255,255,255,0.2)`
                  }}
                >
                  <div 
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), transparent 50%)`
                    }}
                  />
                </div>
                {planet.name}
              </span>
              <span className={`text-xs ${themeColors.textSecondary} ${isDarkMode ? 'bg-slate-700/50' : 'bg-gray-200/70'} px-3 py-1.5 rounded-full font-bold border ${isDarkMode ? 'border-slate-600/30' : 'border-gray-300/50'}`}>
                {speeds[planet.name]?.toFixed(1)}x
              </span>
            </div>
            <div className="relative">
              <input
                type="range"
                min="0"
                max="5"
                step="0.1"
                value={speeds[planet.name] || 1}
                onChange={(e) => onSpeedChange(planet.name, parseFloat(e.target.value))}
                className={`w-full h-4 ${themeColors.sliderTrack} rounded-xl appearance-none cursor-pointer ${themeColors.sliderThumb} transition-all duration-300 shadow-inner`}
                style={{
                  background: `linear-gradient(to right, ${planet.color} 0%, ${planet.color} ${(speeds[planet.name] || 1) * 20}%, ${isDarkMode ? '#374151' : '#d1d5db'} ${(speeds[planet.name] || 1) * 20}%, ${isDarkMode ? '#374151' : '#d1d5db'} 100%)`
                }}
              />
              <div className={`flex justify-between text-xs ${themeColors.textSecondary} mt-2 font-medium`}>
                <span>0x</span>
                <span>2.5x</span>
                <span>5x</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={`mt-6 pt-4 border-t-2 ${themeColors.panelBorder}`}>
        <p className={`text-xs ${themeColors.textSecondary} text-center font-medium`}>
          🖱️ Mouse to rotate • 🔍 Scroll to zoom • ✨ Hover planets for info
        </p>
        <p className={`text-xs ${themeColors.textSecondary} text-center mt-1 opacity-75`}>
          Control individual planet speeds
        </p>
      </div>
    </div>
  );
};