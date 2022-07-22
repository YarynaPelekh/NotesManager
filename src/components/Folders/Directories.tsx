import React from "react";
import DirectoriesTree from "./DirectoriesTree";
import DirectoriesControls from "./DirectoriesControls";
import SectionHeader from "../UI/Layout/SectionHeader";
import Separator from "../UI/Separator";

const Directories = () => {
  return (
    <div className="section">
      <SectionHeader header="Directories" />
      <Separator />
      <DirectoriesControls />
      <DirectoriesTree />
    </div>
  );
};

export default Directories;
