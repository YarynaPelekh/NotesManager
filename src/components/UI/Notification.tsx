import Alert from "react-bootstrap/Alert";

import classes from "./Notification.module.css";

import { AppStateType } from "../../types/AppStateType";

const Notification = (props: {
  notification: AppStateType;
  onClose: () => void;
}) => {
  return (
    <div
      className={`${classes.alert}  ${props.notification.notificationType} alert-dismissible fade show`}
      role="alert"
    >
      {props.notification.notificationMessage}
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
        onClick={props.onClose}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export default Notification;
