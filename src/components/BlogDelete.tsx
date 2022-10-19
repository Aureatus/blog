import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import deleteBlog from "../helpers/blog/deleteBlog";
import UserStateInterface from "../interfaces/UserStateInterface";
import SuccessElement from "./SuccessElement";

const BlogDelete = ({ user }: UserStateInterface) => {
  if (!user) return null;
  const blogId = useLoaderData();
  if (typeof blogId !== "string") return null;
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();

  return success ? (
    <SuccessElement message="Blog deleted!" />
  ) : (
    <div className="level">
      <div className="level-item">
        <section className="hero">
          <div className="hero-body">
            <h2 className="title is-1 has-text-centered  mb-5">
              Are you sure you want to delete this blog?
            </h2>
            <div className="buttons is-centered">
              <button
                type="button"
                className="button is-medium is-danger mr-3"
                onClick={() => deleteBlog(blogId, user, setSuccess, setError)}
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

export default BlogDelete;
