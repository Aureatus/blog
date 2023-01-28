import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import deletePost from "../helpers/posts/deletePost";
import UserStateInterface from "../interfaces/UserStateInterface";
import SuccessElement from "./SuccessElement";

const PostDelete = ({ user }: UserStateInterface) => {
  if (!user) return null;

  const queryClient = useQueryClient();
  const postId = useLoaderData();
  if (typeof postId !== "string") return null;
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();

  return success ? (
    <SuccessElement message="Post deleted!" />
  ) : (
    <div className="level">
      <div className="level-item">
        <section className="hero">
          <div className="hero-body">
            <h2 className="title is-1 has-text-centered  mb-5">
              Are you sure you want to delete this post?
            </h2>
            <div className="buttons is-centered">
              <button
                type="button"
                className="button is-medium is-danger mr-3"
                onClick={() =>
                  deletePost(postId, user, setSuccess, setError).then(() =>
                    queryClient.invalidateQueries(["posts"])
                  )
                }
              >
                Delete
              </button>
              <button
                type="button"
                className="button is-medium is-link px-5 ml-3"
                onClick={() => navigate(-1)}
              >
                No
              </button>
            </div>
            <p className="is-size-4 has-text-centered has-text-weight-medium has-text-danger">
              {error?.message}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PostDelete;
