import React, { useContext, useState } from "react";
import { OdinBookContext } from "../Context";
import "./MyPostDelete.css";

const MyPostDelete = ({
  deleteClick,
  setDeleteClick,
  user_delete_response,
  postid,
}) => {
  const { axios_request } = useContext(OdinBookContext);
  const mypost_delete_route = `/mypost/${postid}`;
  const mypost_delete_method = "DELETE";

  const [postLoading, setPostLoading] = useState(false);

  const [error, setError] = useState("");

  const make_server_request = () => {
    const cb_error = (err) => {
      setError(err.message);
      setPostLoading(false);
    };

    const cb_response = (response) => {
      setPostLoading(false);
      // setDeleteClick(false);
      user_delete_response(response);
    };

    axios_request({
      route: mypost_delete_route,
      data: "",
      method: mypost_delete_method,
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };

  const deleteHandler = () => {
    make_server_request();
  };

  return (
    <div className="MyPostDelete">
      {error && (
        <div className="error">
          <div>{error}</div>
          <div>Please try refreshing the Page</div>
        </div>
      )}
      {!error && (
        <div className="dialog-box">
          <p className="confitm-msg">Are you sure want to delete this post?</p>
          <div className="btn">
            <button
              className="dlt-btn"
              onClick={(e) => {
                e.preventDefault();
                if (!postLoading) {
                  setPostLoading(true);
                  deleteHandler();
                } else {
                  return;
                }
              }}
            >
              {!postLoading ? "Delete" : "Deleting post...."}
            </button>

            <button
              className="cancel-btn"
              onClick={(e) => {
                e.preventDefault();
                setDeleteClick(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPostDelete;
