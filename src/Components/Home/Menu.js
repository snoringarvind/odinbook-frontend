import React, { useState } from "react";
import Hamburger from "../Hamburger/Hamburger";

const Menu = () => {
  const [isClick, setIsclick] = useState(false);
  return (
    <div className="Menu">
      <div
        style={{
          color: isClick ? "red" : "",
        }}
        className="drop-btn "
        onClick={(e) => {
          e.stopPropagation();
          setIsclick(!isClick);
        }}
      >
        {isClick ? (
          <div className="close-icon fas fa-times-circle"></div>
        ) : (
          <div className="ham-icon fa fa-caret-down"></div>
        )}

        {isClick && <Hamburger />}
      </div>
    </div>
  );
};

export default Menu;
