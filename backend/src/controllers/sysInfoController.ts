// Author: Theodor Peifer

import { Request, Response } from "express";
import { getSysInfo } from "../services/sysInfoService";


export const sysInfoRoute = (req: Request, res: Response) => {
    res.json(getSysInfo());
}

