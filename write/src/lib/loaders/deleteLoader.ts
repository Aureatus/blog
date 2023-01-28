import { LoaderFunctionArgs } from "react-router-dom";

const deleteLoader = async ({ params }: LoaderFunctionArgs) => {
  const { postId } = params;
  if (typeof postId !== "string") throw Error("Provided id is not valid");
  return postId;
};

export default deleteLoader;
