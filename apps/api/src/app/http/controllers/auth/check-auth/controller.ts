import { Response } from "express";

export const checkAuthController = async (_, res: Response) => {
  return res.status(200).json({
    message: `You're logged in.`,
  });
};
