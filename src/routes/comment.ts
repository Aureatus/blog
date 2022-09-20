import { Request, Response, Router } from "express";

const commentRouter = Router();

const placeHolderResponse = (req: Request, res: Response) => {
  res.send("test");
};

commentRouter.get("/blogs/:id", placeHolderResponse); // Return all comments where post matches provided id.

commentRouter.post("/create/:id", placeHolderResponse); // Create comment for post of provided id if user is logged in.

export default commentRouter;
