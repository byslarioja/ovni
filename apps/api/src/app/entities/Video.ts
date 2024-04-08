import { randomUUID } from "crypto";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";

@Entity("videos")
export class Video {
  @PrimaryGeneratedColumn("increment")
  id: string = randomUUID();

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
  start_time: string;

  @Column()
  end_time: string;

  @Column({ nullable: true })
  uri: string;

  @ManyToOne(() => User, (user) => user.videos)
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
