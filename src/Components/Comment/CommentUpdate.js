import React from "react";
import CommentForm from "./CommentForm";
import "./CommentUpdate.css";

const CommentUpdate = ({
  postid,
  setComments,
  updateValue,
  commentid,
  commenUpdateClick,
  setCommentUpdateClick,
}) => {
  const route = `/post/${postid}/comment/${commentid}`;
  const method = "PUT";
  console.log(updateValue);

  return (
    <div className="CommentUpdate">
      <div className="comment-update-container">
        <CommentForm
          updateValue={updateValue}
          setComments={setComments}
          route={route}
          method={method}
        />
        <div
          className="cancel-btn"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setCommentUpdateClick(false);
          }}
        >
          cancel
        </div>
      </div>
    </div>
  );
};

export default CommentUpdate;
