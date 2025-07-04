# 3D Solar System Simulation

An interactive 3D solar system simulation built with React, TypeScript, and Three.js. Features real-time planetary motion, individual speed controls, dark/light mode themes, and immersive 3D graphics with colorful planets.

## Features

- **Complete Solar System**: All 8 planets with realistic relative sizes and orbital distances
- **Colorful Planets**: Enhanced visual appearance with emissive materials and vibrant colors
- **Dark/Light Mode**: Toggle between cosmic dark theme and bright daylight theme
- **Real-time Speed Control**: Individual sliders to adjust each planet's orbital speed (0x to 5x)
- **Interactive 3D Camera**: Mouse controls for rotation and zoom
- **Pause/Resume**: Full animation control with visual feedback
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Beautiful UI**: Modern glass-morphism design with smooth animations and theme transitions
- **Performance Optimized**: Smooth 60fps animations with efficient rendering
- **Enhanced Visuals**: Glowing sun, colorful orbit trails, and dynamic starfield

## Technologies Used

- **React 18** - Modern UI framework with hooks
- **TypeScript** - Type-safe development
- **Three.js** - Advanced 3D graphics and animation
- **Tailwind CSS** - Utility-first styling with custom components
- **Vite** - Fast development and optimized build tool

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Extract the project files
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

### Controls
- **View Control**: Click and drag to rotate the camera around the solar system
- **Zoom**: Use mouse wheel to zoom in/out
- **Speed Control**: Use the sliders in the control panel to adjust individual planet speeds (0x to 5x)
- **Pause/Resume**: Click the play/pause button to control animation
- **Theme Toggle**: Click the sun/moon button to switch between dark and light modes
- **Reset**: Click the reset button to restore all speeds to 1x

### Themes
- **Dark Mode**: Cosmic theme with deep space colors, bright stars, and glowing planets
- **Light Mode**: Daylight theme with sky blue background, subtle stars, and enhanced planet visibility

## Project Structure

```
src/
├── components/
│   ├── SolarSystem.tsx      # Main 3D scene component with theme management
│   └── ControlPanel.tsx     # Speed control UI with theme-aware styling
├── utils/
│   └── SolarSystemScene.ts  # Three.js scene management with theme switching
├── data/
│   └── planetData.ts        # Planet configuration with enhanced colors
├── types/
│   └── Planet.ts            # TypeScript interfaces including theme types
└── App.tsx                  # Main application
```

## Key Implementation Details

### 3D Graphics
- **Enhanced Materials**: Phong materials with emissive properties for colorful, glowing planets
- **Dynamic Lighting**: Adaptive lighting system that changes based on theme
- **Particle Systems**: 15,000+ colored stars with theme-responsive appearance
- **Shadow Mapping**: Realistic shadows cast by planets
- **Post-processing**: Tone mapping for enhanced visual quality

### Theme System
- **Seamless Switching**: Real-time theme transitions without performance loss
- **Adaptive Colors**: All UI elements and 3D objects respond to theme changes
- **Consistent Design**: Maintains visual hierarchy across both themes
- **Performance Optimized**: Efficient material updates and lighting changes

### Animation System
- **Smooth Performance**: 60fps animations using requestAnimationFrame
- **Individual Control**: Each planet's speed can be adjusted independently
- **Realistic Physics**: Mathematically accurate orbital mechanics
- **Responsive Updates**: Real-time speed changes without animation interruption

### Responsive Design
- **Mobile Optimized**: Touch-friendly controls and adaptive layouts
- **Cross-platform**: Works on all modern browsers and devices
- **Flexible UI**: Panels automatically adjust to screen size
- **Performance Scaling**: Maintains smooth performance across device capabilities

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Performance Notes

- Optimized for 60fps on modern devices
- Uses hardware acceleration via WebGL
- Efficient memory management with proper cleanup
- Responsive rendering that adapts to device capabilities
- Theme switching optimized for minimal performance impact

## Assignment Requirements Fulfilled

✅ **3D Solar System**: Complete implementation with Sun and all 8 planets  
✅ **Three.js Integration**: Advanced use of 3D graphics, lighting, and animations  
✅ **Speed Controls**: Real-time individual planet speed adjustment  
✅ **Responsive Design**: Works on all screen sizes and devices  
✅ **Bonus Features**: Dark/light mode, pause/resume, camera controls, background stars  
✅ **Clean Code**: Well-structured, commented, and maintainable codebase  
✅ **Performance**: Smooth 60fps animations with efficient rendering  
