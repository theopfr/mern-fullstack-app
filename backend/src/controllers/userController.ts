// Author: Theodor Peifer

import {Request, Response} from "express";
import { IUser, ILoginData } from "../models/userModel";
import { register, login } from "../services/userService";


export const loginController = async (req: Request, res: Response) => {
    try {
        const loginData: ILoginData = req.body;
        const token = await login(loginData);
        res.json({ message: "loginSuccessful", accessToken: token });
    }
    catch (error: any) {
        res.status(401).json({ message: error.message });
    }
}


export const registrationController = async (req: Request, res: Response) => {
    try {
        const registrationData: IUser = req.body;
        await register(registrationData);

        res.json({ message: "registrationSuccessful" });
    }
    catch (error: any) {
        res.status(401).json({ message: error.message });
    }
}
