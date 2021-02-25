import React, { useContext, useEffect, useState } from "react";
import MyPostForm from "./MyPostForm";
import { OdinBookContext } from "../Context";
import { useParams } from "react-router-dom";

const MyPostUpdate = ({
  postid,
  updateClick,
  setUpdateClick,
  updateData,
  user_post_response,
}) => {
  // const { axios_request } = useContext(OdinBookContext);
  // const [post, setPost] = useState("");
  // const [error, setError] = useState("");
  // const [getLoading, setGetLoading] = useState(true);
  // const [formBtnClicked, setFormBtnClicked] = useState(true);

  // const params = useParams();

  // const post_detail_route = `/post/${postid}`;
  // const post_detail_method = "GET";

  const mypost_update_route = `/mypost/${postid}`;
  const mypost_update_method = "PUT";

  // useEffect(() => {
  //   make_server_request();
  // }, []);

  // const make_server_request = () => {
  //   const cb_error = (err) => {
  //     setError(err.message);
  //     setGetLoading(false);
  //   };
  //   const cb_response = (response) => {
  //     setPost(response.data);
  //     setGetLoading(false);
  //     console.log("update data", updateData);
  //     console.log("get request", response);
  //   };

  //   axios_request({
  //     route: post_detail_route,
  //     data: post,
  //     method: post_detail_method,
  //     axios_error: cb_error,
  //     axios_response: cb_response,
  //   });
  // };

  // console.log(post);

  return (
    <div className="MyPostUpdate">
      {updateClick && (
        <MyPostForm
          route={mypost_update_route}
          update_value={updateData}
          method={mypost_update_method}
          createClick={updateClick}
          setCreateClick={setUpdateClick}
          formTitle="Update Post"
          user_post_response={user_post_response}
        />
      )}
    </div>
  );
};

export default MyPostUpdate;
