import React, { Fragment } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import classes from "../../styles/Module/LoginForm.module.css";
import classesModal from "../../styles/Module/Modal.module.css";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let location = useLocation();
  const navigate = useNavigate();

  const loginHandler = (data) => {
    localStorage.setItem("userName", data.userName || "");
    //                                        60s*60*min*24h= 86400
    localStorage.setItem("timerExpires", String(Number(new Date().getTime()) + 86400 * 1000));
    navigate("/", { replace: true });
  };

  const onCloseHandle = () => {
    return <Navigate to="/login" state={{ from: location }} replace />;
  };

  const loginElements = (
    <Fragment>
      <p className={classes.title}>Please, login...</p>

      <form onSubmit={handleSubmit(loginHandler)}>
        <div className={classes.input}>
          <label htmlFor="name">Name</label>
          <input id="name" {...register("userName", { pattern: /^[A-Za-z0-9+_.-]+@(.+)$/i })} />
          {errors?.userName && <p className={classesModal.errorMessage}>User name should be email</p>}
          {String(errors?.userName?.type) === "maxLength" && (
            <p className={classesModal.errorMessage}>User name should be less than 20 characters</p>
          )}
        </div>
        <div className={classes.input}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            {...register("userPassword", { pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/ })}
          />
          {errors?.userPassword && (
            <p className={classesModal.errorMessage}>
              Password should allow alphanumeric values, !@#$%^&* and should be more that 8 symbols
            </p>
          )}
        </div>
        <div className={classes.controlsContainer}>
          <input type="submit" value="OK" className={classesModal.submit} />
          <input type="button" value="Cancel" className={classesModal.submit} onClick={onCloseHandle} />
        </div>
      </form>
    </Fragment>
  );

  return loginElements;
};

export default LoginForm;
