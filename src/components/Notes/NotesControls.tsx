import AddButton from "./NotesButtons/AddButton";
import RemoveButton from "./NotesButtons/RemoveButton";

import classes from "../../styles/Module/NotesControls.module.css";

const NotesControls = () => {
  return (
    <div className={classes.controlsContainer}>
      <AddButton />
      {/* <button>REMOVE</button> */}
      <RemoveButton />
    </div>
  );
};

export default NotesControls;
