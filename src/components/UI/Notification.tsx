import { AppStateType } from "../../types/AppStateType";

import classes from "./Notification.module.css";
// import "bootstrap/dist/css/bootstrap.min.css";

const Notification = (props: {
  notification: AppStateType;
  onClose: () => void;
}) => {
  return (
    <div
      className={`${classes.alert} alert ${props.notification.notificationType} alert-dismissible fade in show`}
      // className="alert fade in show"
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
