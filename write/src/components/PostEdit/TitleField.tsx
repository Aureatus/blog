import { Dispatch, SetStateAction } from "react";
import PostResponseErrorInterface from "../../interfaces/PostResponseErrorInterface";

const TitleField = ({
  title,
  setTitle,
  titleError,
}: {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  titleError: PostResponseErrorInterface | null;
}) => (
  <div className="field">
    <label htmlFor="title" className="label">
      Title
      <div className="control">
        <input
          className={`input${titleError ? " is-danger" : ""}`}
          type="text"
          id="title"
          value={title}
          placeholder="Type title here"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
    </label>
    {titleError?.msg ? (
      <p className="help is-danger">{titleError.msg}</p>
    ) : null}
  </div>
);

export default TitleField;
