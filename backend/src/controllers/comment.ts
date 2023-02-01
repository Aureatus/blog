import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import Comment from "../models/comment";

const commentListGet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const comments = await Comment.find({ post: req.params.id })
      .sort({ timestamp: "desc" })
      .populate({
        path: "author",
        model: "User",
        select: "given_name family_name",
      });
    return res.status(200).send(comments);
  } catch (err) {
    return next(err);
  }
};

const commentCreate = [
  body("text").isString().notEmpty().trim(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(401).send(errors);
      }

      const { _id }: any = req.user;

      const comment = new Comment({
        text: req.body.text,
        timestamp: Date(),
        // eslint-disable-next-line no-underscore-dangle
        author: _id,
        post: req.params.id,
      });

      await Comment.create(comment);
      return res.sendStatus(200);
    } catch (err) {
      return next(err);
    }
  },
];

export { commentListGet, commentCreate };
