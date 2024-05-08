import { Request, Response } from "express";

export const checkAuthController = async (_: Request, res: Response) => {
  return res.status(200).json({
    message: `You're logged in.`,
  });
};
