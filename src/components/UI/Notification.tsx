import React from "react";
import { AppStateType } from "../../types/AppStateType";

import classes from "../../styles/Module/Notification.module.css";

function notificationTimer(closeNotification: () => void) {
  window.setTimeout(closeNotification, 2000);
}

const Notification = (props: { notification: AppStateType; onClose: () => void }) => {
  return (
    <div
      className={`${classes.alert} alert ${props.notification.notificationType} alert-dismissible fade show`}
      // style={{ animation: "slide-down 3000ms ease-out forwards" }}
      style={{ transition: "all 3s ease-in-out 2s" }}
      role="alert"
    >
      {notificationTimer(props.onClose)}
      {props.notification.notificationMessage}
      <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={props.onClose}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export default Notification;
