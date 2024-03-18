import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const auth = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, process.env.APP_KEY);
    req.body.token = decoded;

    next();
  } catch (err) {
    res.status(401).send("Please authenticate");
  }
};
