import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "ovni",
  password: "password",
  database: "ovni",
  synchronize: false,
  logging: false,
  entities: ["src/app/entities/*.ts"],
  migrations: ["src/database/migrations/*.ts"],
});
