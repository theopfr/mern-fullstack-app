// Author: Theodor Peifer

import { Schema, model } from "mongoose";
import * as bcrypt from "bcrypt";


interface IUser {
    _id?: string;
    name: string;
    email: string;
    password: string;
}


interface ILoginData {
    email: string;
    password: string;
}

const artistModel = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

artistModel.pre("save", async function(next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})



const UserModel = model<IUser>("Users", artistModel, "users");

export { IUser, ILoginData, UserModel };

