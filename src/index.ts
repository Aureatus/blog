import express, { Express } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import createError from "http-errors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server TEST");
});

app.use((req, res, next) => {
  next(createError(404));
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
