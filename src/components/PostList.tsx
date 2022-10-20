import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import PostDataInterface from "../interfaces/PostDataInterface";
import getPostList from "../lib/fetch/getPostList";
import LoadingElement from "./LoadingElement";

const PostList = () => {
  const { data, isLoading, isError, error } = useQuery<PostDataInterface[]>(
    ["posts"],
    () => getPostList()
  );

  if (isLoading) return <LoadingElement />;
  if (isError && error instanceof Error) throw error;
  if (!data) return null;

  return (
    <div className="box p-4 m-5">
      <div className="columns is-multiline is-centered is-vcentered p-4">
        {data.map((post: PostDataInterface) => {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          const { title, timestamp, author, published, _id } = post;

          if (!published) return null;

          return (
            <Link key={_id} to={_id} className="column is-one-third">
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
                  </div>
                  <p className="subtitle is-5">
                    Published on:{" "}
                    <strong>{new Date(timestamp).toDateString()}</strong>
                  </p>
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
