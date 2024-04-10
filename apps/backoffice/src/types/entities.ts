export interface Video {
  id: string;
  width: number;
  height: number;
  duration: number;
  app_version: string;
  start_time: string;
  end_time: string;
  uri: string | null;
  user: User;
  readings: Reading[];
  created_at: Date;
  updated_at: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  zip_code: string;
  youtube_channel: string;
  created_at: Date;
  updated_at: Date;
}

export interface Reading {
  value: RotationValue | OrientationValue | GPSValue | ClimateValue;
  sensor: string;
  timestamp: number;
}

type RotationValue = { x: string; y: string; z: string };
type OrientationValue = string;
type GPSValue = {
  coords: Coords;
  speed: string;
  altitude: string;
};
type ClimateValue = {
  temperature: string;
  humidity: string;
};

interface Coords {
  latitude: string;
  longitude: string;
}
