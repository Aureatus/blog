import { useQuery } from "@tanstack/react-query";
import getPost from "../../lib/fetch/getPost";
import ErrorElement from "../ErrorElement";
import LoadingElement from "../LoadingElement";

const PostInfo = ({ postId }: { postId: string }) => {
  const { data, isLoading, isError, error } = useQuery(["posts", postId], () =>
    getPost(postId)
  );

  if (isLoading) return <LoadingElement />;
  if (isError && error instanceof Error)
    return <ErrorElement message="There was an error loading this post." />;

  const { title, content, timestamp, author, published, _id: id } = data;

  if (!published) return null;

  return (
    <div key={id} className="section box">
      <div className="level">
        <div>
          <h1 className="title is-2">{title}</h1>
          <h3 className="subtitle is-4">{`By ${author.given_name} ${author.family_name}`}</h3>
        </div>
        <h4 className="is-size-5 is-italic">
          Published {new Date(timestamp).toDateString()}
        </h4>
      </div>
      <p
        className="is-size-5 has-text-justified"
        style={{ whiteSpace: "pre-line" }}
      >
        {content}
      </p>
    </div>
  );
};

export default PostInfo;
