import { useQuery } from "@tanstack/react-query";
import getComments from "../../lib/fetch/getComments";
import ErrorElement from "../ErrorElement";
import LoadingElement from "../LoadingElement";

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

const CommentList = ({ postId }: { postId: string }) => {
  const { data, isLoading, isError, error } = useQuery(
    ["comments", postId],
    () => getComments(postId)
  );

  if (isLoading) return <LoadingElement />;

  if (isError && error instanceof Error) {
    return <ErrorElement message="There was an error loading comments." />;
  }

  return (
    <div className="columns is-multiline is-centered is-vcentered p-4 ">
      {data.map((comment: CommentInterface) => {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { text, timestamp, author, _id } = comment;
        return (
          <div key={_id} className="column column is-one-third">
            <div className="message is-primary">
              <div className="message-header">
                <h2 className="is-size-4">{`${author.given_name} ${author.family_name}`}</h2>
                <p>{new Date(timestamp).toDateString()}</p>
              </div>
              <div className="message-body">
                <p className="subtitle">{text}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommentList;
