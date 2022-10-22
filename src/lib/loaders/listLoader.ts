import { QueryClient } from "@tanstack/react-query";
import getPostList from "../fetch/getPostList";
import getUserInfo from "../fetch/getUserInfo";

const listLoader = async (user: string | null, queryClient: QueryClient) => {
  if (!user) throw Error("Please login or sign up");
  await queryClient.prefetchQuery(["posts"], getPostList);
  await queryClient.prefetchQuery(["userData"], () => getUserInfo(user));
  return null;
};

export default listLoader;
