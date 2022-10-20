import { QueryClient } from "@tanstack/react-query";
import { LoaderFunctionArgs } from "react-router-dom";
import PostDataInterface from "../../interfaces/PostDataInterface";
import postEditLoader from "./PostEditLoader";

const editLoader = async (
  { params }: LoaderFunctionArgs,
  user: string | null,
  queryClient: QueryClient
) => {
  const { postId } = params;
  if (typeof postId !== "string") throw Error("Provided id is not valid");
  const postDetail: PostDataInterface = await postEditLoader(
    postId,
    user,
    queryClient
  );
  if (postDetail instanceof Error) throw postDetail;
  return postDetail;
};

export default editLoader;
