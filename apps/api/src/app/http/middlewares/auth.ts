import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";
import { findById } from "@app/repositories/user.repository";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

const APP_KEY = process.env.APP_KEY!;

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

    const decoded = jwt.verify(token, APP_KEY) as {
      id: string;
      email: string;
    };

    const authenticatedUser = await findById(decoded.id);

    if (!authenticatedUser) {
      throw new Error();
    }

    req.body.user = authenticatedUser;

    next();
  } catch (err) {
    res.status(401).send("Please authenticate");
  }
};
