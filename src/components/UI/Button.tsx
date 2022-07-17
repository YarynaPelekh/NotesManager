import React, { Fragment } from "react";
import ToolTip from "./ToolTip";

import classes from "../../styles/Module/Button.module.css";

const Button = (props: { title: string; tooltip: string; onClickButton: () => void }) => {
  return (
    <Fragment>
      <ToolTip>
        <button onClick={props.onClickButton} className={classes.button} data-tip={props.tooltip}>
          {props.title}
        </button>
      </ToolTip>
    </Fragment>
  );
};

export default Button;
