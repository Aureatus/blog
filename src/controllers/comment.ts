import { NextFunction, Request, Response } from "express";

const commentListGet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.send("test");
  } catch (err) {
    return next(err);
  }
};

const commentCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.send("test");
  } catch (err) {
    return next(err);
  }
};

export { commentListGet, commentCreate };
