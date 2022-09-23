import { Router } from "express";
import passport from "passport";

import { commentListGet, commentCreate } from "../controllers/comment";

const protectedRoute = passport.authenticate("jwt", { session: false });

const commentRouter = Router();

commentRouter.get("/blogs/:id", commentListGet); // Return all comments where post matches provided id.

commentRouter.post("/create/:id", protectedRoute, commentCreate); // Create comment for post of provided id if user is logged in.

export default commentRouter;
