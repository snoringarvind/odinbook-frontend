import React, { useContext, useEffect } from "react";
import { OdinBookContext } from "./Context";

const Logout = () => {
  const { isAuthValue } = useContext(OdinBookContext);
  const [isAuth, setIsAuth] = isAuthValue;

  useEffect(() => {
    setIsAuth(false);
  }, [isAuth]);

  return (
    <div className="Logout">
      {localStorage.clear()}

      {window.location.reload()}
    </div>
  );
};

export default Logout;
