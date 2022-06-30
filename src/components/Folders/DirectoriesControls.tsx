import AddButton from "./Buttons/AddButton";
import RemoveButton from "./Buttons/RemoveButton";

import classes from "./DirectoriesControls.module.css";

const DirectoriesControls = () => {
  return (
    <div className={classes.controlsContainer}>
      <AddButton />
      <RemoveButton />
    </div>
  );
};

export default DirectoriesControls;
