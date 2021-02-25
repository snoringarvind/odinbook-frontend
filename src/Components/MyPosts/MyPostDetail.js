// import React, { useContext, useEffect, useState } from "react";
// import { OdinBookContext } from "../Context";
// import { Link, useLocation, useParams } from "react-router-dom";

// const MyPostDetail = () => {
//   const { axios_request } = useContext(OdinBookContext);

//   const params = useParams();
//   console.log(params);

//   const [error, setError] = useState("");
//   const [getLoading, setGetLoading] = useState(true);

//   const [post, setPost] = useState("");

//   const post_detail_route = `/post/${params.mypostid}`;
//   const post_detail_method = `GET`;

//   useEffect(() => {
//     make_server_request();
//   }, []);

//   const make_server_request = () => {
//     const cb_error = (err) => {
//       if (err.response) {
//         setError(err.response.data);
//       } else {
//         setError(err.message);
//       }
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
//       axios_response: cb_response,
//     });
//   };

//   let location = useLocation();

//   const display_post = () => {
//     return (
//       <>
//         <div className="title">{post.title}</div>
//         <div className="content_text">{post.content_text}</div>
//         <div className="edit-btn">
//           <Link to={`/update-post/${post._id}`}>
//             <button>Edit</button>
//           </Link>
//         </div>
//         <div className="delete-btn">
//           <Link
//             replace
//             key={post._id}
//             to={{
//               pathname: `/delete-post/${post._id}`,
//               state: { background: location },
//             }}
//           >
//             <button>Delete</button>
//           </Link>
//         </div>
//       </>
//     );
//   };
//   return (
//     <div className="MyPostDetail">
//       {getLoading && "loading..."}
//       {!getLoading && (
//         <>{error ? <div className="error">{error}</div> : display_post()}</>
//       )}
//     </div>
//   );
// };

// export default MyPostDetail;
