import { useLoaderData } from "react-router-dom";
import UserStateInterface from "../../interfaces/UserStateInterface";
import BlogInfo from "./BlogInfo";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

const BlogDetail = ({ user }: UserStateInterface) => {
  const blogId = useLoaderData();
  if (typeof blogId !== "string") return <p>Invalid id type</p>;

  return (
    <div>
      <BlogInfo blogId={blogId} />
      {user ? <CommentForm user={user} blogId={blogId} /> : null}
      <CommentList blogId={blogId} />
    </div>
  );
};

export default BlogDetail;
