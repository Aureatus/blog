import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import Post from "../models/post";

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

const blogCreate = [
  body("title").isString().notEmpty().trim().escape(),
  body("content").isString().notEmpty().trim().escape(),
  body("published").isBoolean(),

  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(401).send(errors);
      }

      const { _id }: any = req.user;

      const post = new Post({
        title: req.body.title,
        content: req.body.content,
        timestamp: Date(),
        // eslint-disable-next-line no-underscore-dangle
        author: _id,
        published: req.body.published,
      });

      await Post.create(post);
      return res.sendStatus(200);
    } catch (err) {
      return next(err);
    }
  },
];

const blogDelete = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.send("test");
  } catch (err) {
    return next(err);
  }
};

export { blogListGet, blogDetailGet, blogUpdate, blogCreate, blogDelete };
