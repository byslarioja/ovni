import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from "typeorm";
import { Video } from "./Video";
import {
  ClimateValue,
  GPSValue,
  OrientationValue,
  RotationValue,
} from "@app/types/sensor-readings";
import { Sensor } from "../enums/Sensor";

@Entity("sensor_readings")
export class SensorReading {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  sensor: Sensor;

  @Column({
    type: "json",
  })
  value: ClimateValue | GPSValue | RotationValue | OrientationValue;

  @Column()
  timestamp: number;

  @ManyToOne(() => Video, (video) => video.readings)
  video: Video;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
