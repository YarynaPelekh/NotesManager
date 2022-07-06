import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = (props: { children: JSX.Element }) => {
  let location = useLocation();

  const userName = localStorage.getItem("userName");
  const timerExpired = Number(localStorage.getItem("timerExpires")) < Number(new Date().getTime());

  if (!userName || timerExpired) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return props.children;
};

export default RequireAuth;
