import React from "react";
import DirectoriesTree from "./DirectoriesTree";
import DirectoriesControls from "./DirectoriesControls";
import SectionHeader from "../UI/Layout/SectionHeader";

const Directories = () => {
  return (
    <div className="section">
      <SectionHeader header="Directories" />
      <DirectoriesControls />
      <DirectoriesTree />
    </div>
  );
};

export default Directories;
