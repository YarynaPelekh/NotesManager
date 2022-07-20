import React from "react";
import DirectoriesTree from "./DirectoriesTree";
import DirectoriesControls from "./DirectoriesControls";
import SectionHeader from "../UI/Layout/SectionHeader";

import classes from "../../styles/Module/Directories.module.css";

const Directories = () => {
  return (
    <div className={classes.directories}>
      <SectionHeader header="Directories" />
      <DirectoriesControls />
      <DirectoriesTree />
    </div>
  );
};

export default Directories;
