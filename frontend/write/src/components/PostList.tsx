import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import PostDataInterface from "../interfaces/PostDataInterface";
import UserStateInterface from "../interfaces/UserStateInterface";
import getPostList from "../lib/fetch/getPostList";
import getUserInfo from "../lib/fetch/getUserInfo";
import ErrorElement from "./ErrorElement";
import LoadingElement from "./LoadingElement";

const PostList = ({ user }: UserStateInterface) => {
  if (!user)
    return <ErrorElement message="Please login or sign up to see your posts" />;
  const { data, isLoading, isError, error } = useQuery<PostDataInterface[]>(
    ["posts"],
    () => getPostList()
  );
  const { data: userData, isLoading: userDataLoading } = useQuery(
    ["userData"],
    () => getUserInfo(user)
  );

  const [linkClicked, setLinkClicked] = useState(false);

  if (isLoading || userDataLoading) return <LoadingElement />;
  if (isError && error instanceof Error)
    return <ErrorElement message="There was an error loading posts." />;

  if (!data) return null;

  const { _id: userId } = userData;

  return (
    <div>
      <div className="level">
        <div className="level-item">
          <Link className="button is-info" to="create">
            Create post
          </Link>
        </div>
      </div>
      <div className="box p-4 m-5">
        <div className="columns is-multiline is-centered is-vcentered p-4">
          {data.map((post: PostDataInterface) => {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            const { title, timestamp, author, _id } = post;
            // eslint-disable-next-line no-underscore-dangle
            if (author._id !== userId && userData.admin === false) return null;
            return (
              <div key={_id} className="column is-one-third">
                <div className="card">
                  <header className="card-header has-background-primary	">
                    <p className="card-header-title title is-3">{title}</p>
                  </header>
                  <div className="card-content">
                    <div className="content">
                      <p className="subtitle is-5">
                        Written by{" "}
                        <strong>{`${author.given_name} ${author.family_name}`}</strong>
                      </p>
                      <p className="subtitle is-5">
                        Published on:{" "}
                        <strong>{new Date(timestamp).toDateString()}</strong>
                      </p>
                    </div>
                  </div>
                  {linkClicked ? (
                    <LoadingElement />
                  ) : (
                    <footer className="card-footer">
                      <Link
                        to={`${_id}/edit`}
                        onClick={() => setLinkClicked(true)}
                        className="card-footer-item"
                      >
                        Edit
                      </Link>
                      <Link
                        to={`${_id}/delete`}
                        onClick={() => setLinkClicked(true)}
                        className="card-footer-item "
                      >
                        Delete
                      </Link>
                    </footer>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PostList;
