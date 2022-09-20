import { Request, Response, Router } from "express";

const blogRouter = Router();

const placeHolderResponse = (req: Request, res: Response) => {
  res.send("test");
};

blogRouter.get("/", placeHolderResponse); // Return published blogs with title, author and timestamp.

blogRouter.get("/:id", placeHolderResponse); // Return blog of provided id with title, content, author and timestamp.

blogRouter.get("/:id/comments", placeHolderResponse); // Return all comments for blog of provided id.

blogRouter.put("/:id/update", placeHolderResponse); // Update  blog of provided id if user is same as blog author or is admin.

blogRouter.post("/create", placeHolderResponse); // Create blog if user is logged in.

blogRouter.post("/:id/delete", placeHolderResponse); // Delete blog of provided id if user is same as blog author or is admin.

export default blogRouter;
