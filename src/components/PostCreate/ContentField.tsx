import { Dispatch, SetStateAction } from "react";
import PostResponseErrorInterface from "../../interfaces/PostResponseErrorInterface";

const ContentField = ({
  content,
  setContent,
  contentError,
}: {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  contentError: PostResponseErrorInterface | null;
}) => (
  <div className="field">
    <label htmlFor="content" className="label">
      Content
      <div className="control">
        <textarea
          form="editForm"
          className={`textarea${contentError ? " is-danger" : ""}`}
          rows={16}
          id="content"
          value={content}
          placeholder="Type content here"
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
    </label>
    {contentError?.msg ? (
      <p className="help is-danger">{contentError.msg}</p>
    ) : null}
  </div>
);

export default ContentField;
