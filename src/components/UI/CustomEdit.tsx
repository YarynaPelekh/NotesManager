import React from "react";

const CustomEdit = (props) => {
  const val = props.value || "";
  return <input style={{ width: "90%" }} defaultValue={val} />;
};

export default CustomEdit;
