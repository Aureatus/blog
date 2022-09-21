import { NextFunction, Request, Response } from "express";

const blogListGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.send("test");
  } catch (err) {
    return next(err);
  }
};

const blogDetailGet = async (
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

const blogUpdate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.send("test");
  } catch (err) {
    return next(err);
  }
};

const blogCreate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.send("test");
  } catch (err) {
    return next(err);
  }
};

const blogDelete = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.send("test");
  } catch (err) {
    return next(err);
  }
};

export { blogListGet, blogDetailGet, blogUpdate, blogCreate, blogDelete };
