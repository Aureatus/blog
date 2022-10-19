import { Router } from "express";
import passport from "passport";

import {
  postListGet,
  postDetailGet,
  postUpdate,
  postCreate,
  postDelete,
} from "../controllers/post";

const protectedRoute = passport.authenticate("jwt", { session: false });

const postRouter = Router();

postRouter.get("/", postListGet); // Return published posts with title, author and timestamp.

postRouter.get("/:id", postDetailGet); // Return post of provided id with title, content, author and timestamp.

postRouter.put("/:id/update", protectedRoute, postUpdate); // Update  post of provided id if user is same as post author or is admin.

postRouter.post("/create", protectedRoute, postCreate); // Create post if user is logged in.

postRouter.delete("/:id/delete", protectedRoute, postDelete); // Delete post of provided id if user is same as post author or is admin.

export default postRouter;
