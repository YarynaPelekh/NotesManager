import DirectoriesTree from "./DirectoriesTree";
import DirectoriesControls from "./DirectoriesControls";

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
