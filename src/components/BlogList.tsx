import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import getBlogList from "../lib/fetch/getBlogList";

interface BlogInterface {
  title: string;
  timestamp: Date;
  author: string;
  published: boolean;
  _id: string;
}

const BlogList = () => {
  const { data, isLoading, isError, error } = useQuery(["blogs"], getBlogList);

  if (isLoading) return null;
  if (isError && error instanceof Error) return <p>{error.message}</p>;

  if (typeof data === "string") return <p>{data}</p>;

  return (
    <>
      {data.map((blog: BlogInterface) => {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { title, timestamp, author, published, _id } = blog;

        if (!published) return null;

        return (
          <Link key={_id} to={_id}>
            <h1>{title}</h1>
            <p>{new Date(timestamp).toDateString()}</p>
            <p>{author}</p>
          </Link>
        );
      })}
    </>
  );
};

export default BlogList;
