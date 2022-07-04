import AddButton from "./NottesButtons/AddButton";
import RemoveButton from "./NottesButtons/RemoveButton";

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
