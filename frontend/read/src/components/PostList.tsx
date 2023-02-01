import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import PostDataInterface from "../interfaces/PostDataInterface";
import getPostList from "../lib/fetch/getPostList";
import ErrorElement from "./ErrorElement";
import LoadingElement from "./LoadingElement";

const PostList = () => {
  const { data, isLoading, isError, error } = useQuery<PostDataInterface[]>(
    ["posts"],
    () => getPostList()
  );
  const [linkClicked, setLinkClicked] = useState(false);

  if (isLoading) return <LoadingElement />;
  if (isError && error instanceof Error) {
    return <ErrorElement message="There was an error loading posts." />;
  }
  if (!data) return null;

  return (
    <div className="box p-4 m-5">
      <div className="columns is-multiline is-centered is-vcentered p-4">
        {data.map((post: PostDataInterface) => {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          const { title, timestamp, author, published, _id: id } = post;

          if (!published) return null;

          return (
            <Link
              key={id}
              to={id}
              className="column is-one-third"
              onClick={() => setLinkClicked(true)}
            >
              <div className="card">
                <header className="card-header has-background-primary	">
                  <p className="card-header-title title is-3">{title}</p>
                </header>
                <div className="card-content">
                  {linkClicked ? (
                    <LoadingElement />
                  ) : (
                    <>
                      <div className="content">
                        <p className="subtitle is-5">
                          Written by{" "}
                          <strong>{`${author.given_name} ${author.family_name}`}</strong>
                        </p>
                      </div>
                      <p className="subtitle is-5">
                        Published on:{" "}
                        <strong>{new Date(timestamp).toDateString()}</strong>
                      </p>
                    </>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default PostList;
