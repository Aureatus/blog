import express, { Express, urlencoded, json } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { connect, connection } from "mongoose";
import passport from "passport";
import cors from "cors";

import loginStrategy from "./strategies/login";

import authRouter from "./routes/auth";
import postRouter from "./routes/post";
import commentRouter from "./routes/comment";
import userRouter from "./routes/user";
import JWTStrategy from "./strategies/JWT";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(morgan("dev"));

app.use(urlencoded({ extended: false }));
app.use(json());

app.use(cors());

const mongoDB = process.env.mongoConnectionURL;
if (mongoDB) {
  connect(mongoDB);
  const db = connection;
  // eslint-disable-next-line no-console
  db.on("error", console.error.bind(console, "MongoDB connection error: "));
}

passport.use("login", loginStrategy);
passport.use(JWTStrategy);

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server TEST");
});

app.use("/", authRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);
app.use("/user", userRouter);

app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
