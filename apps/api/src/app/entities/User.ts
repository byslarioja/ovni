import { randomUUID } from "crypto";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("increment")
  id: string = randomUUID();

  @Column()
  name: string;

  @Column()
  email: string;

  //TODO: make select:false work. Check user.repository's createUser method
  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  zip_code: string;

  @Column({ nullable: true })
  youtube_channel: string;
}
