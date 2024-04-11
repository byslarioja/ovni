export type ClimatePrimitive = {
  temperature: string;
  humidity: string;
};

export type GPSPrimitive = {
  coords: {
    latitude: number;
    longitude: number;
  };
  speed: number;
  altitude: number;
};

export type RotationPrimitive = SpaceType;

export type OrientationPrimitive = SpaceType;

export type SpaceType = { x: number; y: number; z: number };

export type SensorReadingPrimitive<T> = {
  value: T;
  timestamp: number;
};
