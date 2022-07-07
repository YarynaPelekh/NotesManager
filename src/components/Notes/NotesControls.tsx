import AddButton from "./NotesButtons/AddButton";
import EditButton from "./NotesButtons/EditButton";
import RemoveButton from "./NotesButtons/RemoveButton";

import classes from "../../styles/Module/NotesControls.module.css";

const NotesControls = () => {
  return (
    <div className={classes.controlsContainer}>
      <AddButton />
      <EditButton />
      <RemoveButton />
    </div>
  );
};

export default NotesControls;
