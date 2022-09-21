import { NextFunction, Request, Response } from "express";

const loginPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.send("test");
  } catch (err) {
    return next(err);
  }
};

const logoutPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.send("test");
  } catch (err) {
    return next(err);
  }
};

const signupPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.send("test");
  } catch (err) {
    return next(err);
  }
};
export { loginPost, logoutPost, signupPost };
