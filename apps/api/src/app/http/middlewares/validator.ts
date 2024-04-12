import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        file: req.file,
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      return res.status(422).json(error);
    }
  };
