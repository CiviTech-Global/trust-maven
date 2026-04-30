import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

export const sequelize = new Sequelize({
  database: process.env.DB_NAME || "trustmaven",
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  dialect: "postgres",
  logging: process.env.NODE_ENV === "development" ? console.log : false,
  models: [path.join(__dirname, "../domain.layer/models/**/*.model.ts")],
  pool: {
    max: 20,
    min: 5,
    acquire: 30000,
    idle: 10000,
  },
});
