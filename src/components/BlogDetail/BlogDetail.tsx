import { useLoaderData } from "react-router-dom";
import BlogInfo from "./BlogInfo";
import CommentList from "./CommentList";

const BlogDetail = () => {
  const blogId = useLoaderData();
  if (typeof blogId !== "string") return <p>Invalid id type</p>;

  return (
    <div>
      <BlogInfo blogId={blogId} />
      <CommentList blogId={blogId} />
    </div>
  );
};

export default BlogDetail;
