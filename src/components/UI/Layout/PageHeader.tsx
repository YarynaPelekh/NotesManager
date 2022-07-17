import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "../Button";

import classes from "../../../styles/Module/PageHeader.module.css";

const PageHeader = (props: { header: string }) => {
  const navigate = useNavigate();

  return (
    <div className={classes.header}>
      <p>{props.header}</p>
      <div className={classes.button}>
        <Button title="BACK" onClickButton={() => navigate(-1)} tooltip="To the previous page" />
      </div>
    </div>
  );
};

export default PageHeader;
