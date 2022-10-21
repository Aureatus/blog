import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { isValidObjectId } from "mongoose";
import Post from "../models/post";

const postListGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postList = await Post.find(
      {},
      `title timestamp author published _id`
    ).populate({ path: "author", model: "User" });
    return res.status(200).send(postList);
  } catch (err) {
    return next(err);
  }
};

const postDetailGet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!isValidObjectId(req.params.id))
      return res.status(404).send("Invalid post id");
    const postDetail = await Post.findById(req.params.id).populate({
      path: "author",
      model: "User",
    });
    return res.status(200).send(postDetail);
  } catch (err) {
    return next(err);
  }
};

const postUpdate = [
  body("title").isString().notEmpty().trim().escape(),
  body("content").isString().notEmpty().trim().escape(),
  body("published").toBoolean().isBoolean(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(401).send(errors);
      }
      const { _id: userId, admin }: any = req.user;

      const post = await Post.findById(req.params.id);

      if (!post) return res.status(404).send("Post doesn't exist");

      if (
        post.author &&
        JSON.stringify(post.author).replace(/"/g, "") === userId
      ) {
        await post.updateOne({
          title: req.body.title,
          content: req.body.content,
          published: req.body.published,
        });
        return res.sendStatus(200);
      }

      if (admin) {
        post.updateOne({
          title: req.body.title,
          content: req.body.content,
          published: req.body.published,
        });
        return res.sendStatus(200);
      }
      return res.status(401).send("You aren't the creator of this post.");
    } catch (err) {
      return next(err);
    }
  },
];

const postCreate = [
  body("title").isString().notEmpty().trim().escape(),
  body("content").isString().notEmpty().trim().escape(),
  body("published").isBoolean(),

  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(401).send(errors);
      }

      const { _id: userId }: any = req.user;

      const post = new Post({
        title: req.body.title,
        content: req.body.content,
        timestamp: Date(),
        // eslint-disable-next-line no-underscore-dangle
        author: userId,
        published: req.body.published,
      });

      await Post.create(post);
      return res.sendStatus(200);
    } catch (err) {
      return next(err);
    }
  },
];

const postDelete = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { _id: userId, admin }: any = req.user;
    if (!isValidObjectId(req.params.id))
      return res.status(404).send("Invalid post id");

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send("Post doesn't exist");

    if (
      post.author &&
      JSON.stringify(post.author).replace(/"/g, "") === userId
    ) {
      post.delete();
      return res.sendStatus(200);
    }
    if (admin) {
      post.delete();
      return res.sendStatus(200);
    }
    return res.status(401).send("You aren't the creator of this post.");
  } catch (err) {
    return next(err);
  }
};

export { postListGet, postDetailGet, postUpdate, postCreate, postDelete };
