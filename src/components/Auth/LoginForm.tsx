import { Fragment, useRef } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import classes from "../../styles/Module/LoginForm.module.css";

const LoginForm = () => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  let location = useLocation();
  const navigate = useNavigate();

  const loginHandler = () => {
    if (nameInputRef.current?.value.trim().length === 0) {
      alert("Please, enter a name!");
    } else if (passwordInputRef.current?.value.trim().length === 0) {
      alert("Please, enter a password!");
    } else {
      localStorage.setItem("userName", nameInputRef.current?.value || "");
      //                                        60s*60*min*24h= 86400
      localStorage.setItem("timerExpires", String(Number(new Date().getTime()) + 86400 * 1000));
      navigate("/", { replace: true });
    }
  };

  const onCloseHandle = () => {
    return <Navigate to="/login" state={{ from: location }} replace />;
  };

  const loginElements = (
    <Fragment>
      <p className={classes.title}>Please, login...</p>

      <div className={classes.input}>
        <label htmlFor="name">Name</label>
        <input id="name" ref={nameInputRef}></input>
      </div>
      <div className={classes.input}>
        <label htmlFor="password">Password</label>
        <input id="password" ref={passwordInputRef}></input>
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
