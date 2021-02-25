// import React, { useContext, useEffect, useState } from "react";
// import { OdinBookContext } from "../Context";
// import { useParams } from "react-router-dom";

// const PostDetail = () => {
//   const axios_request = useContext(OdinBookContext);

//   const [error, setError] = useState("");
//   const [getLoading, setGetLoading] = useState(true);

//   const [post, setPost] = useState("");
//   const params = useParams();
//   const post_detail_route = `/post/${params.id}`;
//   const post_detail_method = `GET`;

//   useEffect(() => {
//     make_server_request();
//   }, []);

//   const make_server_request = () => {
//     const cb_error = (err) => {
//       setError(err.message);
//       setGetLoading(false);
//     };

//     const cb_response = (response) => {
//       setPost(response.data);
//       setGetLoading(false);
//     };

//     axios_request({
//       route: post_detail_route,
//       data: "",
//       method: post_detail_method,
//       axios_error: cb_error,
//       axios_reponse: cb_response,
//     });
//   };

//   const display_post = () => {
//     return (
//       <>
//         <div className="title">{post.title}</div>
//         <div className="content_text">{post.content_text}</div>
//       </>
//     );
//   };
//   return (
//     <div className="PostDetail">
//       {getLoading && "loading..."}
//       {!getLoading && (
//         <>{error ? <div className="error">{error}</div> : display_post()}</>
//       )}
//     </div>
//   );
// };

// export default PostDetail;
