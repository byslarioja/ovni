import { AppDataSource } from "./src/config/database";
import express from "express";
import cors from "cors";
import routes from "./src/routes/api";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

AppDataSource.initialize().catch((error) => console.log(error));

const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use("/api", routes);

const PORT = process.env.APP_PORT || 8000;
app.listen(PORT, () => console.log(`initialized on ${PORT}`));
