import { QueryClient } from "@tanstack/react-query";
import { LoaderFunctionArgs } from "react-router-dom";
import getComments from "../fetch/getComments";
import getPost from "../fetch/getPost";

const detailLoader = async (
  { params }: LoaderFunctionArgs,
  queryClient: QueryClient
) => {
  const { postId } = params;
  if (typeof postId !== "string") return null;
  await queryClient.prefetchQuery(["posts", postId], () => getPost(postId));
  await queryClient.prefetchQuery(["comments", postId], () =>
    getComments(postId)
  );
  return postId;
};

export default detailLoader;
