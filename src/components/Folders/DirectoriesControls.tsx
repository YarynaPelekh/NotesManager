// @ts-ignore
import AddButton from "./Buttons/AddButton.tsx";
// @ts-ignore
import RemoveButton from "./Buttons/RemoveButton.tsx";

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
