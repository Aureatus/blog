import { useState } from "react";
import postComment from "../../lib/fetch/postComment";

const CommentForm = ({ user, blogId }: { user: string; blogId: string }) => {
  const [commentText, setCommentText] = useState("");

  const createComment = async () => {
    postComment(blogId, commentText, user);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createComment();
      }}
    >
      <label htmlFor="commentText">
        <input
          type="text"
          id="commentText"
          placeholder="Type comment"
          value={commentText}
          onChange={(e) => {
            setCommentText(e.target.value);
          }}
        />
      </label>
    </form>
  );
};

export default CommentForm;
