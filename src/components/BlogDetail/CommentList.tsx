import { useQuery } from "@tanstack/react-query";
import getComments from "../../lib/fetch/getComments";

interface CommentInterface {
  text: string;
  timestamp: Date;
  author: {
    user_name: string;
    given_name: string;
    family_name: string;
    password: string;
    admin: boolean;
  };
  _id: string;
}

const CommentList = ({ blogId }: { blogId: string }) => {
  const { data, isLoading, isError, error } = useQuery(
    ["comments", blogId],
    () => getComments(blogId)
  );

  if (isLoading) return null;
  if (isError && error instanceof Error) return <p>{error.message}</p>;

  if (typeof data === "string") return <p>{data}</p>;

  return (
    <>
      {data.map((comment: CommentInterface) => {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { text, timestamp, author, _id } = comment;

        return (
          <div key={_id}>
            <h2>{`${author.given_name} ${author.family_name}`}</h2>
            <p>{text}</p>
            <p>{new Date(timestamp).toDateString()}</p>
          </div>
        );
      })}
    </>
  );
};

export default CommentList;
