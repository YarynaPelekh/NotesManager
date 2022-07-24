import React from "react";
import pict from "../../../asserts/img/img/pngfind.com-sticky-notes-png-2830596.png";

import classes from "../../../styles/Module/Header.module.css";

const Header = () => {
  return (
    <header className={classes.header}>
      <img style={{ width: "2.8rem" }} src={pict} />
      <p style={{ display: "inline", paddingLeft: "1rem" }}>Notes Manager</p>
    </header>
  );
};

export default Header;
