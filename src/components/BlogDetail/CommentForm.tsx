import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import postComment from "../../lib/fetch/postComment";

const CommentForm = ({ user, blogId }: { user: string; blogId: string }) => {
  const [commentText, setCommentText] = useState("");
  const [commentError, setCommentError] = useState<Error | null>(null);

  const queryClient = useQueryClient();

  const createComment = async () => {
    try {
      const commentResponse = await postComment(blogId, commentText, user);
      if (commentResponse instanceof Error) throw commentResponse;
      queryClient.invalidateQueries(["comments", blogId]);
      setCommentError(null);
    } catch (err) {
      if (err instanceof Error) setCommentError(err);
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
      {commentError?.message ? <p>{commentError.message}</p> : null}
    </form>
  );
};

export default CommentForm;
