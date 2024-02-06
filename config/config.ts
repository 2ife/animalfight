import dotenv from "dotenv";

dotenv.config();

export default {
  development: {
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD,
    database: "animalfight_dev",
    host: process.env.DB_HOST,
    dialect: "mysql" as const,
  },
  test: {
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD,
    database: "animalfight_test",
    host: process.env.DB_HOST,
    dialect: "mysql" as const,
  },
  production: {
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD,
    database: "animalfight",
    host: process.env.DB_HOST,
    dialect: "mysql" as const,
    logging: false,
  },
};
