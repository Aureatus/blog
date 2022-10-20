import { useQuery } from "@tanstack/react-query";
import PostDataInterface from "../../interfaces/PostDataInterface";
import getPost from "../../lib/fetch/getPost";

const PostInfo = ({ postId }: { postId: string }) => {
  const { data, isLoading, isError, error } = useQuery(["posts", postId], () =>
    getPost(postId)
  );

  if (isLoading) return null;
  if (isError && error instanceof Error)
    return (
      <div className="hero is-danger">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-size-1 has-text-centered is-capitalized ">
              There was an error loading this post.
            </h1>
          </div>
        </div>
      </div>
    );

  const postObject = data.reduce((post: PostDataInterface) => post);

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { title, content, timestamp, author, published, _id } = postObject;

  if (!published) return null;

  return (
    <div key={_id} className="section box">
      <div className="level">
        <div>
          <h1 className="title is-2">{title}</h1>
          <h3 className="subtitle is-4">{`By ${author.given_name} ${author.family_name}`}</h3>
        </div>
        <h4 className="is-size-5 is-italic">
          Published {new Date(timestamp).toDateString()}
        </h4>
      </div>
      <p className="is-size-5 has-text-justified">{content}</p>
    </div>
  );
};

export default PostInfo;
