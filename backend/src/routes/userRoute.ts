// Author: Theodor Peifer

import express from "express";
import { registrationController, loginController } from "../controllers/userController";

const userRoute = express.Router()

userRoute.post("/login", loginController);
userRoute.post("/register", registrationController);


export default userRoute;