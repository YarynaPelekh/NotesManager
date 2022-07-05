import { Fragment, useRef } from "react";

import { Navigate, useLocation, useNavigate } from "react-router-dom";

import classes from "../../styles/Module/Modal.module.css";

const LoginForm = () => {
  const nameInputRef = useRef<HTMLInputElement>(null);

  let location = useLocation();
  const navigate = useNavigate();

  const loginHandler = () => {
    localStorage.setItem("userName", nameInputRef.current?.value || "");
    localStorage.setItem("timerExpires", String(Number(new Date().getTime()) + 3000 * 1000000));
    navigate("/", { replace: true });
  };

  const onCloseHandle = () => {
    return <Navigate to="/login" state={{ from: location }} replace />;
  };

  const loginElements = (
    <Fragment>
      <p>Please, login...</p>

      <div className={classes.input}>
        <label htmlFor="name">Name</label>
        <input id="name" ref={nameInputRef}></input>
      </div>
      <div className={classes.controlsContainer}>
        <button onClick={loginHandler}>OK</button>
        <button onClick={onCloseHandle}>Cancel</button>
      </div>
    </Fragment>
  );

  return loginElements;
};

export default LoginForm;
