// Author: Theodor Peifer

import express from "express";
import { sysInfoRoute } from "../controllers/sysInfoController";
import { authenticationCheck } from "../middleware/authenticationCheck";

const sysInfoRouter = express.Router()

sysInfoRouter.get("/sysinfo", authenticationCheck, sysInfoRoute);



export default sysInfoRouter;