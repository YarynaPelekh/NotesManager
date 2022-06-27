// @ts-ignore
import Directories from "../Folders/Directories.tsx";
// @ts-ignore
import Notes from "../Notes/Notes.tsx";

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
