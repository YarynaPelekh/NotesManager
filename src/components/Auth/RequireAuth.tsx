import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = (props: { children: JSX.Element }) => {
  let location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const userName = localStorage.getItem("userName");
  const timerExpired = Number(localStorage.getItem("timerExpires")) < Number(new Date().getTime());

  useEffect(() => {
    const timer = setInterval(() => {
      if (Number(localStorage.getItem("timerExpires")) < Number(new Date().getTime())) {
        setIsLoggedIn(false);
        localStorage.removeItem("userName");
        localStorage.removeItem("timerExpires");
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!userName || timerExpired) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return props.children;
};

export default RequireAuth;
