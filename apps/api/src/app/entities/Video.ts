import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { SensorReading } from "./SensorReadings";

@Entity("videos")
export class Video {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  integrity_string: string;

  @Column()
  id_from_video: string;

  @Column()
  device_uri: string;

  @Column({ nullable: true })
  width: number;

  @Column({ nullable: true })
  height: number;

  @Column({ nullable: true })
  duration: number;

  @Column()
  app_version: string;

  @Column()
  start_time: string;

  @Column()
  end_time: string;

  @Column({ nullable: true })
  uri: string;

  @ManyToOne(() => User, (user) => user.videos, { eager: true })
  user: User;

  @OneToMany(() => SensorReading, (reading) => reading.video)
  readings: SensorReading[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
