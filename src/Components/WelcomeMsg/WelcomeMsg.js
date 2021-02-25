import React, { useContext } from "react";
import { OdinBookContext } from "../Context";
import "./WelcomeMsg.css";

const WelcomeMsg = () => {
  const { jwtData } = useContext(OdinBookContext);
  return (
    <div className="WelcomeMsg" id="welcome_msg_unique">
      <div className="container-msg">
        Welcome <span>{jwtData.fname} </span>
        <span>{jwtData.lname} :)</span>
      </div>
    </div>
  );
};

export default WelcomeMsg;
