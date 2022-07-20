import React from "react";

import AddButton from "./Buttons/AddDirectory";
import RemoveButton from "./Buttons/RemoveDirectory";

import classes from "../../styles/Module/DirectoriesControls.module.css";

const DirectoriesControls = () => {
  return (
    <div className="controlsContainer">
      <AddButton />
      <RemoveButton />
    </div>
  );
};

export default DirectoriesControls;
