import { Schema, model } from "mongoose";

const CommentSchema = new Schema({
  text: { type: String, required: true },
  timestamp: { type: Date, required: true },
  author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
});

const Comment = model("Comment", CommentSchema);

export default Comment;
