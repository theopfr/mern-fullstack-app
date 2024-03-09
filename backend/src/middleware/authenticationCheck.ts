// Author: Theodor Peifer

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";


export const authenticationCheck = (req: Request, res: Response, next: NextFunction) => {
    const authHeader: string | undefined = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "authenticationMissing" });
    }

    const token = authHeader.split(" ")[1]
    
    try {
        const verified = jwt.verify(token, config.jwtSecretKey);
        next();
    }
    catch (error) {
        console.log(error)
        return res.status(401).json({ message: "authenticationFailed" });
    }
}
 