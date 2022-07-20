import React, { Fragment } from "react";
import ReactTooltip from "react-tooltip";

const ToolTip = (props: { children: JSX.Element }) => {
  return (
    <Fragment>
      <div>{props.children}</div>
      <ReactTooltip delayHide={200} delayShow={400} backgroundColor="#dadada" borderColor="#ccc" textColor="#333" />
    </Fragment>
  );
};
export default ToolTip;
