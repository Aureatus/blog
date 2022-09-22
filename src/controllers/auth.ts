import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import User from "../models/user";

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

const signupPost = [
  body("user_name").isEmail().normalizeEmail(),
  body("given_name").notEmpty().trim().escape(),
  body("family_name").notEmpty().trim().escape(),
  body("password").notEmpty().trim().escape(),
  body("admin").isBoolean(),
  body("confirm_password").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
    return true;
  }),

  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(401).send(errors);
      }
      const user = new User({
        user_name: req.body.user_name,
        given_name: req.body.given_name,
        family_name: req.body.family_name,
        password: req.body.password,
        admin: req.body.admin,
      });

      await User.create(user);
      return res.sendStatus(200);
    } catch (err) {
      return next(err);
    }
  },
];
export { loginPost, logoutPost, signupPost };
