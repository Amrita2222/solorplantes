import React, { useEffect, useState } from 'react';
import { Rocket, Star, Globe, Zap, Users, Award, ArrowRight, Play } from 'lucide-react';

interface AboutPageProps {
  isDarkMode: boolean;
}

export const AboutPage: React.FC<AboutPageProps> = ({ isDarkMode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    planets: 0,
    stars: 0,
    users: 0,
    animations: 0
  });

  const themeColors = isDarkMode ? {
    bg: 'bg-slate-900/95',
    cardBg: 'bg-slate-800/50',
    border: 'border-slate-700/50',
    text: 'text-white',
    textSecondary: 'text-gray-300',
    accent: 'text-blue-400'
  } : {
    bg: 'bg-white/95',
    cardBg: 'bg-gray-50/50',
    border: 'border-gray-200/50',
    text: 'text-gray-900',
    textSecondary: 'text-gray-600',
    accent: 'text-blue-600'
  };

  useEffect(() => {
    setIsVisible(true);
    
    // Animate statistics
    const targets = { planets: 8, stars: 20000, users: 50000, animations: 100 };
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let step = 0;
    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setAnimatedStats({
        planets: Math.floor(targets.planets * easeOut),
        stars: Math.floor(targets.stars * easeOut),
        users: Math.floor(targets.users * easeOut),
        animations: Math.floor(targets.animations * easeOut)
      });

      if (step >= steps) {
        clearInterval(interval);
        setAnimatedStats(targets);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Interactive 3D Universe",
      description: "Explore our solar system with realistic 3D graphics, orbital mechanics, and stunning visual effects powered by Three.js.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-time Controls",
      description: "Adjust planetary speeds, pause animations, and control the simulation in real-time with intuitive controls.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Educational Content",
      description: "Learn fascinating facts about each planet with detailed information cards and interactive tooltips.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Responsive Design",
      description: "Seamlessly works across all devices - desktop, tablet, and mobile with touch-friendly interactions.",
      color: "from-green-500 to-teal-500"
    }
  ];

  const technologies = [
    { name: "React 18", description: "Modern UI framework", icon: "⚛️" },
    { name: "TypeScript", description: "Type-safe development", icon: "🔷" },
    { name: "Three.js", description: "3D graphics library", icon: "🎮" },
    { name: "Tailwind CSS", description: "Utility-first styling", icon: "🎨" },
    { name: "Vite", description: "Fast build tool", icon: "⚡" },
    { name: "WebGL", description: "Hardware acceleration", icon: "🚀" }
  ];

  return (
    <div className="min-h-screen pt-16 pb-20">
      {/* Hero Section */}
      <section className={`relative py-20 px-4 sm:px-6 lg:px-8 ${isVisible ? 'animate-fadeIn' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="relative inline-block mb-8">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
            <Rocket className="relative w-20 h-20 mx-auto text-blue-500 animate-float" />
          </div>
          
          <h1 className={`text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 ${themeColors.text} leading-tight`}>
            Explore the{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Solar System
            </span>
          </h1>
          
          <p className={`text-lg sm:text-xl lg:text-2xl ${themeColors.textSecondary} mb-12 max-w-4xl mx-auto leading-relaxed`}>
            An immersive 3D journey through our cosmic neighborhood. Experience the beauty and wonder of space 
            with interactive controls, stunning visuals, and educational content.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2">
              <Play className="w-5 h-5" />
              <span>Start Exploring</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button className={`${themeColors.cardBg} border-2 ${themeColors.border} ${themeColors.text} px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 backdrop-blur-xl hover:shadow-xl flex items-center space-x-2`}>
              <Star className="w-5 h-5" />
              <span>Learn More</span>
            </button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${isVisible ? 'animate-slideIn' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Planets", value: animatedStats.planets, suffix: "", icon: "🪐" },
              { label: "Stars", value: animatedStats.stars, suffix: "+", icon: "⭐" },
              { label: "Users", value: animatedStats.users, suffix: "+", icon: "👥" },
              { label: "Animations", value: animatedStats.animations, suffix: "+", icon: "✨" }
            ].map((stat, index) => (
              <div 
                key={stat.label}
                className={`${themeColors.cardBg} border-2 ${themeColors.border} rounded-3xl p-6 text-center backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:shadow-xl transform`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className={`text-3xl lg:text-4xl font-bold ${themeColors.accent} mb-2`}>
                  {stat.value.toLocaleString()}{stat.suffix}
                </div>
                <div className={`text-sm ${themeColors.textSecondary} font-medium`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${themeColors.text} mb-6`}>
              Powerful Features
            </h2>
            <p className={`text-lg ${themeColors.textSecondary} max-w-3xl mx-auto`}>
              Discover what makes our solar system simulation unique and engaging
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className={`${themeColors.cardBg} border-2 ${themeColors.border} rounded-3xl p-8 backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl transform group`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className={`text-xl font-bold ${themeColors.text} mb-4`}>
                  {feature.title}
                </h3>
                <p className={`${themeColors.textSecondary} leading-relaxed`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${themeColors.text} mb-6`}>
              Built with Modern Tech
            </h2>
            <p className={`text-lg ${themeColors.textSecondary} max-w-3xl mx-auto`}>
              Powered by cutting-edge technologies for optimal performance and user experience
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {technologies.map((tech, index) => (
              <div 
                key={tech.name}
                className={`${themeColors.cardBg} border-2 ${themeColors.border} rounded-2xl p-6 text-center backdrop-blur-xl transition-all duration-500 hover:scale-110 hover:shadow-xl transform group`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-3xl mb-3 group-hover:animate-bounce">{tech.icon}</div>
                <h3 className={`font-bold ${themeColors.text} mb-2 text-sm`}>
                  {tech.name}
                </h3>
                <p className={`text-xs ${themeColors.textSecondary}`}>
                  {tech.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`${themeColors.cardBg} border-2 ${themeColors.border} rounded-3xl p-12 backdrop-blur-xl shadow-2xl`}>
            <div className="relative inline-block mb-8">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
              <Award className="relative w-16 h-16 mx-auto text-yellow-500 animate-float" />
            </div>
            
            <h2 className={`text-3xl sm:text-4xl font-bold ${themeColors.text} mb-6`}>
              Ready to Explore Space?
            </h2>
            
            <p className={`text-lg ${themeColors.textSecondary} mb-8 leading-relaxed`}>
              Join thousands of space enthusiasts and start your cosmic journey today. 
              Discover the wonders of our solar system in stunning 3D.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
                <Rocket className="w-5 h-5" />
                <span>Launch Experience</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button className={`${themeColors.cardBg} border-2 ${themeColors.border} ${themeColors.text} px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 backdrop-blur-xl hover:shadow-xl flex items-center justify-center space-x-2`}>
                <Star className="w-5 h-5" />
                <span>View Gallery</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};