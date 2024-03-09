// Author: Theodor Peifer

import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import config from "./config";


var cors = require("cors")

import sysInfoRouter from "./routes/sysInfoRoute";
import artistsRouter from "./routes/artistsRoute";
import userRouter from "./routes/userRoute";
import connectMongoDB from "./database";

dotenv.config();

const app: Express = express();

app.listen(config.port, () => {
	console.log(`Server running on localhost:${config.port}`);
});

connectMongoDB(config.mongoDbUri);

app.use(cors());
app.use(express.json());
app.use(sysInfoRouter);
app.use(artistsRouter);
app.use(userRouter);