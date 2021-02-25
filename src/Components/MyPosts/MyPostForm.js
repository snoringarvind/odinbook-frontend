import React, { useContext, useEffect, useRef, useState } from "react";
import { OdinBookContext } from "../Context";
import uniqid from "uniqid";
import { useHistory, useLocation, useParams } from "react-router-dom";
import "./MyPostForm.css";

const MyPostForm = ({
  route,
  update_value,
  method,
  formTitle,
  user_post_response,
  createClick,
  setCreateClick,
  updateClick,
  setUpdateClick,
}) => {
  const { axios_request } = useContext(OdinBookContext);

  const [error, setError] = useState("");
  const [errors, setErrors] = useState([]);

  const [postLoading, setPostLoading] = useState(false);

  const refTitle = useRef();
  const refContenText = useRef();

  useEffect(() => {
    refTitle.current.value = update_value ? update_value.title : "";
    refContenText.current.value = update_value ? update_value.content_text : "";
  }, []);

  const submitHandler = () => {
    setPostLoading(true);
    const axios_error = (err) => {
      if (err.response) {
        setErrors(err.response.data);
      } else {
        setError(err.message);
      }
      setPostLoading(false);
    };

    const axios_response = (response) => {
      setErrors([]);
      setPostLoading(false);
      user_post_response(response);
      setCreateClick(false);
    };

    axios_request({
      route: route,
      data: {
        title: refTitle.current.value,
        content_text: refContenText.current.value,
      },
      method: method,
      axios_error: axios_error,
      axios_response: axios_response,
    });
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
    <div className="MyPostForm">
      {error && (
        <div className="error">
          <div>{error} </div>
          <div>Please try refreshing the page</div>
        </div>
      )}
      {!error && (
        <div className="form-container">
          <div className="form-head">
            <div className="form-title">{formTitle}</div>
            <div
              className="form-close-btn fas fa-times-circle"
              onClick={(e) => {
                e.preventDefault();
                setCreateClick(false);
              }}
            ></div>
          </div>

          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                placeholder="Enter your post title"
                name="title"
                ref={refTitle}
              />
            </div>
            <div className="form-group">
              <label htmlFor="content_text">Text</label>
              <textarea
                type="text"
                id="content_text"
                name="content_text"
                placeholder="Add text"
                ref={refContenText}
                // value={}
              />
            </div>
            {display_errors()}
            <div className="submit-btn">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  //to prevent multiple clicks
                  if (postLoading) {
                    return;
                  } else {
                    submitHandler();
                  }
                }}
              >
                {!postLoading ? "Submit" : "Submitting..."}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
export default MyPostForm;
