// Author: Theodor Peifer

import dotenv from "dotenv";

dotenv.config();

interface Config {
    port: number;
    mongoDbUri: string;
    jwtSecretKey: string;
    jwtExpMinutes: number;
}
  
const config: Config = {
    port: parseInt(process.env.BACKEND_PORT || "3001", 10),
    mongoDbUri: `mongodb://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}/elouvredb?authSource=admin` || "",
    jwtSecretKey: process.env.JWT_SECRET_KEY || "",
    jwtExpMinutes: parseInt(process.env.JWT_EXP_MINUTES || "", 10),
};

export default config;