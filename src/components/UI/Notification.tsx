import Alert from "react-bootstrap/Alert";

import classes from "./Notification.module.css";

const Notification = (props: {
  notificationText: string;
  onClose: () => void;
}) => {
  return (
    <Alert variant="success" className={classes.alert}>
      {/* <Alert.Heading>The directory was added successfully</Alert.Heading> */}
      <Alert.Heading>{props.notificationText}</Alert.Heading>
      <button
        type="button"
        data-dismiss="alert"
        aria-label="Close"
        onClick={props.onClose}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </Alert>
  );
};

export default Notification;
