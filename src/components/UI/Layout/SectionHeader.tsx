import React from "react";

import classes from "../../../styles/Module/SectionHeader.module.css";

const SectionHeader = (props: { header: string }) => {
  return (
    <div className={classes.header}>
      <p>{props.header}</p>
    </div>
  );
};

export default SectionHeader;
