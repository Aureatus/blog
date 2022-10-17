import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import BlogDataInterface from "../interfaces/BlogDataInterface";
import UserStateInterface from "../interfaces/UserStateInterface";
import getBlogList from "../lib/fetch/getBlogList";
import getUserInfo from "../lib/fetch/getUserInfo";

const BlogList = ({ user }: UserStateInterface) => {
  if (!user) return null;
  const { data, isLoading, isError, error } = useQuery<BlogDataInterface[]>(
    ["blogs"],
    () => getBlogList()
  );

  const { data: userData, isLoading: userDataLoading } = useQuery(
    ["userId"],
    () => getUserInfo(user)
  );
  if (!data) return null;
  if (isLoading || userDataLoading) return null;
  if (isError && error instanceof Error) return <p>{error.message}</p>;
  const { _id: userId } = userData;

  return (
    <div className="box p-4 m-5">
      <div className="columns is-multiline is-centered is-vcentered p-4">
        {data.map((blog: BlogDataInterface) => {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          const { title, timestamp, author, published, _id } = blog;
          // eslint-disable-next-line no-underscore-dangle
          if (author._id !== userId) return null;

          if (!published) return null;

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
                <footer className="card-footer">
                  <Link to={`${_id}/edit`} className="card-footer-item">
                    Edit
                  </Link>
                  <Link to={`${_id}/delete`} className="card-footer-item ">
                    Delete
                  </Link>
                </footer>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BlogList;
