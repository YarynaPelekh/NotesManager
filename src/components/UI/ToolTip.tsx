import React, { Fragment } from "react";
import ReactTooltip from "react-tooltip";

const ToolTip = (props: { children: JSX.Element }) => {
  return (
    <Fragment>
      <div>{props.children}</div>
      <ReactTooltip backgroundColor="#ccc" borderColor="#aaa" textColor="#333" />
    </Fragment>
  );
};
export default ToolTip;
