import { Schema, model } from "mongoose";

const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, required: true },
  author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
  published: { type: Boolean, required: true },
});

const Post = model("Post", PostSchema);

export default Post;
