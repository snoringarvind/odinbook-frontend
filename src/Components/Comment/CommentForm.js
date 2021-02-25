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

  console.log(comments);
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

    console.log(postIndex);

    if (element) {
      const remove_empty = element.querySelector(`#post-${postIndex} .empty`);
      if (remove_empty) {
        remove_empty.style.display = "none";
      }
    }

    // setNewCommentLoading(true);

    console.log(element);

    const cb_error = (err) => {
      console.log(err);
      if (err.response) {
        console.log(err.response.data);
        setErrors(err.response.data);
      } else {
        setError(err.message);
      }
    };
    const cb_response = (response) => {
      setErrors([]);
    };

    // console.log(valueRef.current.value);
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

  console.log(valueRef);
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
              console.log(valueRef);

              if (valueRef.current.value == "") {
                return;
              } else {
                console.log(valueRef.current.value);
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
