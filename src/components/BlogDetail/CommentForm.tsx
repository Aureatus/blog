import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import postComment from "../../lib/fetch/postComment";

const CommentForm = ({ user, blogId }: { user: string; blogId: string }) => {
  const [commentText, setCommentText] = useState("");

  const queryClient = useQueryClient();

  const createComment = async () => {
    try {
      await postComment(blogId, commentText, user);
      queryClient.invalidateQueries(["comments", blogId]);
    } catch (err) {
      console.log(err);
    }
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
