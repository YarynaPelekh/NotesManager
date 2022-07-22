import React from "react";

const CustomDisplay = (props) => {
  const val = props.value || "";
  return <div style={{ overflow: "hidden" }}>{val}</div>;
};

export default CustomDisplay;
