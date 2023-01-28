import { useLoaderData } from "react-router-dom";
import UserStateInterface from "../../interfaces/UserStateInterface";
import PostInfo from "./PostInfo";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

const PostDetail = ({ user }: UserStateInterface) => {
  const postId = useLoaderData();
  if (typeof postId !== "string") return <p>Invalid id type</p>;

  return (
    <div className="container">
      <PostInfo postId={postId} />
      {user ? <CommentForm user={user} postId={postId} /> : null}
      <CommentList postId={postId} />
    </div>
  );
};

export default PostDetail;
