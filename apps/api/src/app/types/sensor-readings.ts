export type ClimateValue = {
  temperature: string;
  humidity: string;
};

export type GPSValue = {
  coords: {
    latitude: number;
    longitude: number;
  };
  speed: number;
  altitude: number;
};

export type RotationValue = { x: number; y: number; z: number };

export type OrientationValue = string;
