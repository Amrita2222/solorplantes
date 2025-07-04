import * as THREE from 'three';
import { planetData } from '../data/planetData';
import { PlanetMesh } from '../types/Planet';

export class SolarSystemScene {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private planets: PlanetMesh[] = [];
  private sun: THREE.Mesh;
  private stars: THREE.Points;
  private animationId: number | null = null;
  private clock: THREE.Clock;
  private isPaused: boolean = false;
  private controls: any;
  private isDarkMode: boolean = true;
  private raycaster: THREE.Raycaster;
  private mouse: THREE.Vector2;
  private hoveredPlanet: string | null = null;
  private onPlanetHover: ((planetName: string | null) => void) | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.clock = new THREE.Clock();
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    
    this.init();
  }

  private init() {
    // Setup renderer
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    this.updateRendererBackground();

    // Setup camera
    this.camera.position.set(0, 30, 60);
    this.camera.lookAt(0, 0, 0);

    // Create stars
    this.createStars();

    // Create sun
    this.createSun();

    // Create planets
    this.createPlanets();

    // Add lighting
    this.setupLighting();

    // Setup simple mouse controls
    this.setupControls();

    // Start animation
    this.animate();
  }

  private updateRendererBackground() {
    if (this.isDarkMode) {
      this.renderer.setClearColor(0x0B0B1F, 1); // Deep space blue
    } else {
      this.renderer.setClearColor(0xE8F4FD, 1); // Soft sky blue
    }
  }

  private createStars() {
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ 
      color: this.isDarkMode ? 0xffffff : 0x666666, 
      size: this.isDarkMode ? 1.2 : 0.6,
      transparent: true,
      opacity: this.isDarkMode ? 0.9 : 0.5
    });

    const starVertices = [];
    const starColors = [];
    
    for (let i = 0; i < 20000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      starVertices.push(x, y, z);

      // Professional color palette for stars
      const color = new THREE.Color();
      if (this.isDarkMode) {
        const starTypes = [
          { h: 0.15, s: 0.8, l: 0.9 }, // Golden
          { h: 0.6, s: 0.7, l: 0.85 }, // Blue-white
          { h: 0.05, s: 0.9, l: 0.8 }, // Orange
          { h: 0.0, s: 0.8, l: 0.85 }, // Red
          { h: 0.0, s: 0.0, l: 0.95 }, // Pure white
        ];
        const starType = starTypes[Math.floor(Math.random() * starTypes.length)];
        color.setHSL(starType.h, starType.s, starType.l);
      } else {
        color.setHSL(Math.random() * 0.1 + 0.55, 0.4, 0.4);
      }
      starColors.push(color.r, color.g, color.b);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    starGeometry.setAttribute('color', new THREE.Float32BufferAttribute(starColors, 3));
    
    starMaterial.vertexColors = true;
    this.stars = new THREE.Points(starGeometry, starMaterial);
    this.scene.add(this.stars);
  }

  private createSun() {
    const sunGeometry = new THREE.SphereGeometry(2, 64, 64);
    const sunMaterial = new THREE.MeshBasicMaterial({ 
      color: this.isDarkMode ? 0xFFD700 : 0xFF6B00, // Gold to orange
      emissive: this.isDarkMode ? 0xFFA500 : 0xFF4500,
      emissiveIntensity: this.isDarkMode ? 1.0 : 1.2
    });
    
    this.sun = new THREE.Mesh(sunGeometry, sunMaterial);
    this.sun.castShadow = false;
    this.sun.userData = { name: 'Sun' };
    
    // Enhanced sun glow with multiple layers
    const glowGeometry1 = new THREE.SphereGeometry(2.8, 32, 32);
    const glowMaterial1 = new THREE.MeshBasicMaterial({
      color: this.isDarkMode ? 0xFFB347 : 0xFF8C00,
      transparent: true,
      opacity: this.isDarkMode ? 0.4 : 0.5
    });
    const sunGlow1 = new THREE.Mesh(glowGeometry1, glowMaterial1);
    
    const glowGeometry2 = new THREE.SphereGeometry(3.5, 32, 32);
    const glowMaterial2 = new THREE.MeshBasicMaterial({
      color: this.isDarkMode ? 0xFF6B35 : 0xFF6B00,
      transparent: true,
      opacity: this.isDarkMode ? 0.2 : 0.3
    });
    const sunGlow2 = new THREE.Mesh(glowGeometry2, glowMaterial2);
    
    this.sun.add(sunGlow1);
    this.sun.add(sunGlow2);
    
    this.scene.add(this.sun);
  }

  private createPlanets() {
    planetData.forEach((data) => {
      const geometry = new THREE.SphereGeometry(data.radius, 64, 64);
      
      // Professional material with enhanced properties
      const material = new THREE.MeshPhongMaterial({ 
        color: data.color,
        emissive: data.emissiveColor || data.color,
        emissiveIntensity: this.isDarkMode ? (data.emissiveIntensity || 0.15) : (data.emissiveIntensity || 0.2),
        shininess: 50,
        specular: 0x444444,
        transparent: false
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = data.distance;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = { name: data.name };
      
      // Enhanced orbit lines with gradient effect
      const orbitGeometry = new THREE.RingGeometry(data.distance - 0.08, data.distance + 0.08, 256);
      const orbitMaterial = new THREE.MeshBasicMaterial({ 
        color: data.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.isDarkMode ? 0.5 : 0.8
      });
      const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
      orbit.rotation.x = -Math.PI / 2;
      this.scene.add(orbit);
      
      // Add subtle planet glow
      const planetGlowGeometry = new THREE.SphereGeometry(data.radius * 1.3, 32, 32);
      const planetGlowMaterial = new THREE.MeshBasicMaterial({
        color: data.emissiveColor || data.color,
        transparent: true,
        opacity: this.isDarkMode ? 0.15 : 0.1
      });
      const planetGlow = new THREE.Mesh(planetGlowGeometry, planetGlowMaterial);
      mesh.add(planetGlow);
      
      this.scene.add(mesh);
      
      this.planets.push({
        mesh,
        data,
        angle: Math.random() * Math.PI * 2,
        orbitSpeed: data.orbitSpeed
      });
    });
  }

  private setupLighting() {
    // Clear existing lights
    const lights = this.scene.children.filter(child => child instanceof THREE.Light);
    lights.forEach(light => this.scene.remove(light));

    if (this.isDarkMode) {
      // Enhanced dark mode lighting
      const ambientLight = new THREE.AmbientLight(0x2C3E50, 0.3);
      this.scene.add(ambientLight);

      const sunLight = new THREE.PointLight(0xFFD700, 4, 300);
      sunLight.position.set(0, 0, 0);
      sunLight.castShadow = true;
      sunLight.shadow.mapSize.width = 2048;
      sunLight.shadow.mapSize.height = 2048;
      this.scene.add(sunLight);

      // Rim lighting for dramatic effect
      const rimLight = new THREE.DirectionalLight(0x4A90E2, 0.3);
      rimLight.position.set(20, 20, 20);
      this.scene.add(rimLight);
    } else {
      // Enhanced light mode lighting
      const ambientLight = new THREE.AmbientLight(0x87CEEB, 0.9);
      this.scene.add(ambientLight);

      const sunLight = new THREE.PointLight(0xFFFFFF, 3, 300);
      sunLight.position.set(0, 0, 0);
      sunLight.castShadow = true;
      sunLight.shadow.mapSize.width = 2048;
      sunLight.shadow.mapSize.height = 2048;
      this.scene.add(sunLight);

      // Multiple directional lights for even illumination
      const directionalLight1 = new THREE.DirectionalLight(0xFFFFFF, 0.8);
      directionalLight1.position.set(15, 15, 10);
      this.scene.add(directionalLight1);

      const directionalLight2 = new THREE.DirectionalLight(0x87CEEB, 0.4);
      directionalLight2.position.set(-15, -10, -10);
      this.scene.add(directionalLight2);

      // Soft fill light
      const fillLight = new THREE.DirectionalLight(0xE8F4FD, 0.3);
      fillLight.position.set(0, -20, 0);
      this.scene.add(fillLight);
    }
  }

  private setupControls() {
    let isMouseDown = false;
    let mouseX = 0;
    let mouseY = 0;

    const canvas = this.renderer.domElement;

    canvas.addEventListener('mousedown', (event) => {
      isMouseDown = true;
      mouseX = event.clientX;
      mouseY = event.clientY;
    });

    canvas.addEventListener('mousemove', (event) => {
      // Update mouse position for raycasting
      const rect = canvas.getBoundingClientRect();
      this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      if (!isMouseDown) {
        // Check for planet hover when not dragging
        this.checkPlanetHover();
        return;
      }

      const deltaX = event.clientX - mouseX;
      const deltaY = event.clientY - mouseY;

      // Rotate camera around the scene
      const spherical = new THREE.Spherical();
      spherical.setFromVector3(this.camera.position);
      spherical.theta -= deltaX * 0.01;
      spherical.phi += deltaY * 0.01;
      spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi));

      this.camera.position.setFromSpherical(spherical);
      this.camera.lookAt(0, 0, 0);

      mouseX = event.clientX;
      mouseY = event.clientY;
    });

    canvas.addEventListener('mouseup', () => {
      isMouseDown = false;
    });

    canvas.addEventListener('wheel', (event) => {
      const scale = event.deltaY > 0 ? 1.1 : 0.9;
      this.camera.position.multiplyScalar(scale);
      this.camera.position.clampLength(20, 200);
    });

    canvas.addEventListener('mouseleave', () => {
      if (this.hoveredPlanet && this.onPlanetHover) {
        this.onPlanetHover(null);
        this.hoveredPlanet = null;
      }
    });
  }

  private checkPlanetHover() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    
    // Check intersections with planets and sun
    const intersectableObjects = [this.sun, ...this.planets.map(p => p.mesh)];
    const intersects = this.raycaster.intersectObjects(intersectableObjects);

    if (intersects.length > 0) {
      const planetName = intersects[0].object.userData.name;
      if (planetName !== this.hoveredPlanet) {
        this.hoveredPlanet = planetName;
        if (this.onPlanetHover) {
          this.onPlanetHover(planetName);
        }
      }
    } else {
      if (this.hoveredPlanet && this.onPlanetHover) {
        this.onPlanetHover(null);
        this.hoveredPlanet = null;
      }
    }
  }

  public setOnPlanetHover(callback: (planetName: string | null) => void) {
    this.onPlanetHover = callback;
  }

  private animate = () => {
    this.animationId = requestAnimationFrame(this.animate);

    if (!this.isPaused) {
      const delta = this.clock.getDelta();

      // Enhanced sun rotation with pulsing effect
      this.sun.rotation.y += 0.01;
      const time = this.clock.getElapsedTime();
      this.sun.scale.setScalar(1 + Math.sin(time * 2) * 0.02);

      // Animate planets
      this.planets.forEach((planet) => {
        // Orbit animation
        planet.angle += planet.orbitSpeed * delta * 10;
        planet.mesh.position.x = Math.cos(planet.angle) * planet.data.distance;
        planet.mesh.position.z = Math.sin(planet.angle) * planet.data.distance;

        // Enhanced rotation animation
        planet.mesh.rotation.y += planet.data.rotationSpeed;
        
        // Subtle floating animation
        planet.mesh.position.y = Math.sin(time + planet.angle) * 0.2;
      });

      // Rotate stars slowly
      this.stars.rotation.y += 0.0003;
      this.stars.rotation.x += 0.0001;
    }

    this.renderer.render(this.scene, this.camera);
  };

  public toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    
    // Update renderer background
    this.updateRendererBackground();
    
    // Recreate stars with new colors
    this.scene.remove(this.stars);
    this.createStars();
    
    // Update sun material with professional colors
    const sunMaterial = this.sun.material as THREE.MeshBasicMaterial;
    sunMaterial.color.setHex(this.isDarkMode ? 0xFFD700 : 0xFF6B00);
    sunMaterial.emissive.setHex(this.isDarkMode ? 0xFFA500 : 0xFF4500);
    sunMaterial.emissiveIntensity = this.isDarkMode ? 1.0 : 1.2;
    
    // Update sun glow layers
    const sunGlow1 = this.sun.children[0] as THREE.Mesh;
    const glowMaterial1 = sunGlow1.material as THREE.MeshBasicMaterial;
    glowMaterial1.color.setHex(this.isDarkMode ? 0xFFB347 : 0xFF8C00);
    glowMaterial1.opacity = this.isDarkMode ? 0.4 : 0.5;
    
    const sunGlow2 = this.sun.children[1] as THREE.Mesh;
    const glowMaterial2 = sunGlow2.material as THREE.MeshBasicMaterial;
    glowMaterial2.color.setHex(this.isDarkMode ? 0xFF6B35 : 0xFF6B00);
    glowMaterial2.opacity = this.isDarkMode ? 0.2 : 0.3;
    
    // Update planet materials with enhanced colors
    this.planets.forEach((planet) => {
      const material = planet.mesh.material as THREE.MeshPhongMaterial;
      material.emissiveIntensity = this.isDarkMode ? 
        (planet.data.emissiveIntensity || 0.15) : 
        (planet.data.emissiveIntensity || 0.2);
      
      // Update planet glow
      const planetGlow = planet.mesh.children[0] as THREE.Mesh;
      const planetGlowMaterial = planetGlow.material as THREE.MeshBasicMaterial;
      planetGlowMaterial.opacity = this.isDarkMode ? 0.15 : 0.1;
    });
    
    // Update orbit materials
    this.scene.children.forEach((child) => {
      if (child instanceof THREE.Mesh && child.geometry instanceof THREE.RingGeometry) {
        const material = child.material as THREE.MeshBasicMaterial;
        material.opacity = this.isDarkMode ? 0.5 : 0.8;
      }
    });
    
    // Update lighting
    this.setupLighting();
  }

  public isDarkModeActive() {
    return this.isDarkMode;
  }

  public updatePlanetSpeed(planetName: string, speed: number) {
    const planet = this.planets.find(p => p.data.name === planetName);
    if (planet) {
      planet.orbitSpeed = planet.data.orbitSpeed * speed;
    }
  }

  public pause() {
    this.isPaused = true;
  }

  public resume() {
    this.isPaused = false;
  }

  public togglePause() {
    this.isPaused = !this.isPaused;
  }

  public isPausedState() {
    return this.isPaused;
  }

  public onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  public dispose() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    this.renderer.dispose();
  }
}