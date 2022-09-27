import { useQuery } from "@tanstack/react-query";
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

  return <div />;
};

export default BlogList;
