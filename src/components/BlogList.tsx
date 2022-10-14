import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import getBlogList from "../lib/fetch/getBlogList";

interface BlogInterface {
  title: string;
  timestamp: Date;
  author: {
    user_name: string;
    given_name: string;
    family_name: string;
    password: string;
    admin: boolean;
  };
  published: boolean;
  _id: string;
}

const BlogList = () => {
  const { data, isLoading, isError, error } = useQuery(["blogs"], getBlogList);

  if (isLoading) return null;
  if (isError && error instanceof Error) return <p>{error.message}</p>;

  if (typeof data === "string") return <p>{data}</p>;

  return (
    <div className="box p-4 m-5">
      <div className="columns is-multiline is-centered is-vcentered p-4">
        {data.map((blog: BlogInterface) => {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          const { title, timestamp, author, published, _id } = blog;

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

export default BlogList;
