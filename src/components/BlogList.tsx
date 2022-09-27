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

  return <div />;
};

export default BlogList;
