export interface PlanetData {
  name: string;
  radius: number;
  distance: number;
  color: string;
  orbitSpeed: number;
  rotationSpeed: number;
  texture?: string;
  emissiveColor?: string;
  emissiveIntensity?: number;
}

export interface PlanetMesh {
  mesh: THREE.Mesh;
  data: PlanetData;
  angle: number;
  orbitSpeed: number;
}

export interface ThemeColors {
  background: string;
  panelBg: string;
  panelBorder: string;
  textPrimary: string;
  textSecondary: string;
  buttonBg: string;
  buttonHover: string;
  sliderTrack: string;
  sliderThumb: string;
}