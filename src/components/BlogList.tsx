import { useQuery } from "@tanstack/react-query";
import getBlogList from "../lib/fetch/getBlogList";

const BlogList = () => {
  const { data, isLoading, isError, error } = useQuery(["blogs"], getBlogList);

  return <div />;
};

export default BlogList;
