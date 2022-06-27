// @ts-ignore
import DirectoriesTree from "./DirectoriesTree.tsx";
// @ts-ignore
import DirectoriesControls from "./DirectoriesControls.tsx";

import classes from "./Directories.module.css";

const Directories = () => {
  return (
    <div className={classes.directories}>
      <DirectoriesControls />
      <DirectoriesTree />
    </div>
  );
};

export default Directories;
