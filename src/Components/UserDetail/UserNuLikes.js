// import React, { useContext, useEffect, useState } from "react";
// import { OdinBookContext } from "../Context";
// import UserPostCard from "./UserPostCard";

// const UserNuLikes = ({ value, index, likeClick, setLikeClick }) => {
//   console.log(likeClick, index);
//   console.log(likeClick.length);
// const { jwtData } = useContext(OdinBookContext);

//   useEffect(()=>{
//     const check = value.like.includes(jwtData.sub);
//     likeClick[index] =
//   },[])

//   return (
//     <div className="UserNuLikes">
//       <div
//         className="no-like"
//         onClick={(e) => {
//           e.preventDefault();
//           e.stopPropagation();
//         }}
//       >
//         <span>{likeClick.length}</span>
//         <span> </span>
//       </div>
//     </div>
//   );
// };

// export default UserNuLikes;
