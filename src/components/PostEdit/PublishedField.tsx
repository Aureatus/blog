import { Dispatch, SetStateAction } from "react";
import PostResponseErrorInterface from "../../interfaces/PostResponseErrorInterface";

const PublishedField = ({
  published,
  setPublished,
  publishedError,
}: {
  published: boolean;
  setPublished: Dispatch<SetStateAction<boolean>>;
  publishedError: PostResponseErrorInterface | null;
}) => (
  <div className="field">
    <div className="control">
      <label htmlFor="published" className="checkbox">
        <input
          className={`mr-1 ${publishedError ? " is-danger" : ""}`}
          type="checkbox"
          id="published"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
        />
        Published
      </label>
    </div>
    {publishedError?.msg ? (
      <p className="help is-danger">{publishedError.msg}</p>
    ) : null}
  </div>
);

export default PublishedField;
