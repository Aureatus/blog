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
      <div className="field">
        <label htmlFor="commentText" className="label">
          <div className="control">
            <input
              className={`input${commentError?.message ? " is-danger" : ""}`}
              type="text"
              id="commentText"
              placeholder="Leave a comment!"
              value={commentText}
              onChange={(e) => {
                setCommentText(e.target.value);
              }}
            />
          </div>
        </label>
        {commentError?.message ? (
          <p className="help is-danger">{commentError.message}</p>
        ) : null}
      </div>
    </form>
  );
};

export default CommentForm;
