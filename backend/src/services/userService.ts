// Author: Theodor Peifer

import { IUser, ILoginData, UserModel } from "../models/userModel";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config";


function validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}



export async function register(userData: IUser) {
    if (userData.name.length < 2) {
        throw new Error("invalidUserName");
    }

    if (!validateEmail(userData.email)) {
        throw new Error("invalidEmail");
    }

    if (userData.password.length < 8 || !/\d/.test(userData.password)) {
        throw new Error("passwordTooWeak");
    }

    if (userData.password.length > 60) {
        throw new Error("passwordTooLong");
    }

    const existingUser: IUser | null = await UserModel.findOne({ email: userData.email });
    if (existingUser) {
        throw new Error("emailAlreadyExists");
    }

    try {
        const newUser = new UserModel(userData);
        const result = await newUser.save();
    }
    catch (error) {
        console.log(error);
        throw new Error("registrationFailed");
    }
}



export async function login(loginData: ILoginData) {
    const userResult: IUser | null = await UserModel.findOne({ email: loginData.email });
    if (!userResult) {
        throw new Error("emailOrPasswordIncorrect");
    }

    const passwordCorrect = await bcrypt.compare(loginData.password, userResult.password);
    if (!passwordCorrect) {
        throw new Error("emailOrPasswordIncorrect");
    }

    var token = jwt.sign({ id: userResult._id }, config.jwtSecretKey, { expiresIn: config.jwtExpMinutes * 60 });
    return token;
}