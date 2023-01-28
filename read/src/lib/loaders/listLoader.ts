import { QueryClient } from "@tanstack/react-query";
import getPostList from "../fetch/getPostList";

const listLoader = async (queryClient: QueryClient) => {
  await queryClient.prefetchQuery(["posts"], getPostList);
  return null;
};

export default listLoader;
