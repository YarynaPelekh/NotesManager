import Alert from "react-bootstrap/Alert";

import classes from "./Notification.module.css";

import { AppStateType } from "../../types/AppStateType";

const Notification = (props: {
  notification: AppStateType;
  onClose: () => void;
}) => {
  return (
    <Alert variant="success" className={classes.alert}>
      <Alert.Heading>{props.notification.notificationMessage}</Alert.Heading>
      <button
        type="button"
        data-dismiss="alert "
        aria-label="Close"
        onClick={props.onClose}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </Alert>
  );
};

export default Notification;
