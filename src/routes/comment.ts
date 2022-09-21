import { Router } from "express";

import { commentListGet, commentCreate } from "../controllers/comment";

const commentRouter = Router();

commentRouter.get("/blogs/:id", commentListGet); // Return all comments where post matches provided id.

commentRouter.post("/create/:id", commentCreate); // Create comment for post of provided id if user is logged in.

export default commentRouter;
