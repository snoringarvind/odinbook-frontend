import React, { useState, useEffect } from "react";
import Hamburger from "../Hamburger/Hamburger";

const Menu = () => {
  const [isClick, setIsclick] = useState(false);
  useEffect(() => {
    const x = window;
    x.addEventListener("click", (e) => {
      //maybe if something goes wrong ..putting this in a try,catch block
      try {
        e.stopPropagation();
        e.preventDefault();
        let arr = e.target.classList;

        for (let i = 0; i < arr.length; i++) {
          let element = document.querySelector(`.${arr[i]}`);

          // doing this 'if(element==null)' so if the form-btn is clicked cancel this function shouldn't be affected.
          //since the form-btn will be null when it is closed, so to prevent the error
          if (element == null) {
            return;
          }

          let p = element.classList;
          if (
            p[i].toString() !== "drop-btn" &&
            p[i] !== null &&
            p[i] !== "ham-icon" &&
            p[i] !== "close-icon"
          ) {
            setIsclick(false);
          }
          arr = [];
        }

        arr = [];
      } catch (err) {
        console.log(err.message);
      }
    });
  }, []);
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
