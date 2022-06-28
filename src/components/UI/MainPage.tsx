import Directories from "../Folders/Directories";
import Notes from "../Notes/Notes";

import classes from "./MainPage.module.css";

const MainPage = () => {
  return (
    <div className={classes.main}>
      <Directories />
      <Notes />
    </div>
  );
};

export default MainPage;
