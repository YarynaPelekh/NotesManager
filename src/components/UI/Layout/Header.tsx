import React from "react";
import pict from "../../../asserts/img/img/pngfindcom-sticky-notes-png-2830596_1.png";

import classes from "../../../styles/Module/Header.module.css";

const Header = () => {
  return (
    <header className={classes.header}>
      <img className={classes.img} src={pict} />
      <p>Notes Manager</p>
    </header>
  );
};

export default Header;
