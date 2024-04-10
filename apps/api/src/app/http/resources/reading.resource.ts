import { SensorReading } from "@app/entities/SensorReading";
import { Sensor } from "@app/enums/Sensor";
import {
  ClimateValue,
  GPSValue,
  RotationValue,
} from "@app/types/sensor-readings";

export class SensorReadingResource {
  public static toJson(reading: SensorReading): SerializableSensorReading {
    return {
      value: formatValue(reading),
      sensor: reading.sensor,
      timestamp: reading.timestamp,
    };
  }

  public static toArray(
    readings: SensorReading[]
  ): Array<SerializableSensorReading> {
    return readings.map(this.toJson);
  }
}

function formatValue(reading: SensorReading) {
  if (reading.sensor === Sensor.Orientation) {
    return degToDMS(reading.value as number);
  } else if (reading.sensor === Sensor.Rotation) {
    const value = reading.value as RotationValue;
    return {
      x: degToDMS(value.x),
      y: degToDMS(value.y),
      z: degToDMS(value.z),
    };
  } else if (reading.sensor === Sensor.GPS) {
    const value = reading.value as GPSValue;
    return {
      speed: `${value.speed.toFixed(2)} m/s`,
      coords: {
        latitude: String(value.coords.latitude),
        longitude: String(value.coords.longitude),
      },
      altitude: `${value.altitude.toFixed(2)}msnm`,
    };
  }

  return reading.value as ClimateValue;
}

function degToDMS(deg: number, dplaces = 0) {
  var d = Math.floor(deg);
  var m = Math.floor((deg - d) * 60);
  var s =
    Math.round(((deg - d) * 60 - m) * 60 * Math.pow(10, dplaces)) /
    Math.pow(10, dplaces);
  s == 60 && (m++, (s = 0));
  m == 60 && (d++, (m = 0));
  return d + "° " + m + "' " + s + '"';
}

export type SerializableSensorReading = Omit<
  SensorReading,
  "id" | "value" | "video" | "created_at" | "updated_at" | "deleted_at"
> & {
  value:
    | string
    | { x: string; y: string; z: string }
    | {
        speed: string;
        coords: { latitude: string; longitude: string };
        altitude: string;
      }
    | { temperature: string; humidity: string };
};
