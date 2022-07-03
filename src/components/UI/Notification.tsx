import { AppStateType } from "../../types/AppStateType";

import classes from "./Notification.module.css";

const Notification = (props: { notification: AppStateType; onClose: () => void }) => {
  return (
    <div
      className={`${classes.alert} alert ${props.notification.notificationType} alert-dismissible fade show`}
      // style={{ animation: "slide-down 3000ms ease-out forwards" }}
      style={{ transition: "all 3s ease-in-out 2s" }}
      role="alert"
    >
      {props.notification.notificationMessage}
      <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={props.onClose}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export default Notification;
