import React, { Fragment } from "react";
import ToolTip from "./ToolTip";

// import classes from "../../styles/Module/Button.module.css";
// import classes from "../../styles/general.css";

const Button = (props: { title: string; tooltip: string; onClickButton: () => void }) => {
  return (
    <Fragment>
      <ToolTip>
        <button className="button" onClick={props.onClickButton} data-tip={props.tooltip}>
          {props.title}
        </button>
      </ToolTip>
    </Fragment>
  );
};

export default Button;
