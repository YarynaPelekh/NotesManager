import React from "react";
import DirectoriesTree from "./DirectoriesTree";
import DirectoriesControls from "./DirectoriesControls";

import classes from "../../styles/Module/Directories.module.css";

const Directories = () => {
  return (
    <div className={classes.directories}>
      <p>Directories</p>
      <DirectoriesControls />
      <DirectoriesTree />
    </div>
  );
};

export default Directories;
