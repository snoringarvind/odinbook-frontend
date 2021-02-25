import React, { useContext, useRef, useState } from "react";

import uniqid from "uniqid";
import "./CommentForm.css";
import { OdinBookContext } from "../Context";

const CommentForm = ({
  setComments,
  postIndex,
  route,
  method,
  updateValue,
  comments,
  pp,
  setpp,
}) => {
  const { jwtData, axios_request } = useContext(OdinBookContext);

  const valueRef = useRef();

  const [errors, setErrors] = useState([]);
  const [error, setError] = useState("");

  const post_comment = () => {
    let element;
    element = document.querySelector(`#post-${postIndex}`);

    comments.comment_list.push({
      comment: valueRef.current.value,
      user: {
        fname: jwtData.fname,
        lname: jwtData.lname,
        username: jwtData.user,
        _id: jwtData.sub,
      },
    });

    setComments(comments);

    setpp(!pp);

    if (element) {
      const remove_empty = element.querySelector(`#post-${postIndex} .empty`);
      if (remove_empty) {
        remove_empty.style.display = "none";
      }
    }

    const cb_error = (err) => {
      if (err.response) {
        setErrors(err.response.data);
      } else {
        setError(err.message);
      }
    };
    const cb_response = (response) => {
      setErrors([]);
    };

    axios_request({
      route: route,
      data: { comment: valueRef.current.value },
      method: method,
      axios_error: cb_error,
      axios_response: cb_response,
    });

    valueRef.current.value = "";
  };

  const display_errors = () => {
    let arr = [];

    if (!Array.isArray(errors)) {
      arr.push(<li key={uniqid()}>{errors.msg}</li>);
    } else {
      for (let i = 0; i < errors.length; i++) {
        arr.push(<li key={uniqid()}>{errors[i].msg}</li>);
      }
    }

    return <ul className="errors">{arr}</ul>;
  };

  return (
    <div className="CommentForm">
      {error && <div className="error">{error}</div>}
      {!error && (
        <>
          <div className="profile-picture">
            {[jwtData.fname[0].toLowerCase()]}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();

              if (valueRef.current.value == "") {
                return;
              } else {
                post_comment();
              }
            }}
            autoComplete="off"
          >
            <input
              type="text"
              name="comment"
              id="comment"
              placeholder="Write a comment..."
              ref={valueRef}
            />
          </form>
          {display_errors()}
        </>
      )}
    </div>
  );
};

export default CommentForm;
