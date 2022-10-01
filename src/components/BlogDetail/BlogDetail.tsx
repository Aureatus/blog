import { useLoaderData } from "react-router-dom";
import BlogInfo from "./BlogInfo";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

const BlogDetail = () => {
  const blogId = useLoaderData();
  if (typeof blogId !== "string") return <p>Invalid id type</p>;

  const user = localStorage.getItem("bearerToken");

  return (
    <div>
      <BlogInfo blogId={blogId} />
      <CommentList blogId={blogId} />
      {user ? <CommentForm /> : null}
    </div>
  );
};

export default BlogDetail;
