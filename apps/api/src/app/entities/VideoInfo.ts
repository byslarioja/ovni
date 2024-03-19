import { randomUUID } from "crypto";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("videos_info")
export class VideoInfo {
  @PrimaryGeneratedColumn("increment")
  id: string = randomUUID();

  @Column()
  hash: string;

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
}
