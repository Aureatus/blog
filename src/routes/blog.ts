import { Router } from "express";

import {
  blogListGet,
  blogDetailGet,
  blogUpdate,
  blogCreate,
  blogDelete,
} from "../controllers/blog";

const blogRouter = Router();

blogRouter.get("/", blogListGet); // Return published blogs with title, author and timestamp.

blogRouter.get("/:id", blogDetailGet); // Return blog of provided id with title, content, author and timestamp.

blogRouter.put("/:id/update", blogUpdate); // Update  blog of provided id if user is same as blog author or is admin.

blogRouter.post("/create", blogCreate); // Create blog if user is logged in.

blogRouter.post("/:id/delete", blogDelete); // Delete blog of provided id if user is same as blog author or is admin.

export default blogRouter;
