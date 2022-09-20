import express, { Express } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import createError from "http-errors";

import authRouter from "./routes/auth";
import blogRouter from "./routes/blog";
import commentRouter from "./routes/comment";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server TEST");
});

app.use("/", authRouter);
app.use("/blogs", blogRouter);
app.use("/comments", commentRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
