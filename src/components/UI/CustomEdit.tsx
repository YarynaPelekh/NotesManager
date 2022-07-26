import React, { useRef } from "react";

const CustomEdit = (props) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const val = props.value || "";

  const onChangeHandler = () => {
    props.setParentValue(titleRef.current?.value || "");
  };

  return <input ref={titleRef} style={{ width: "90%" }} defaultValue={val} onChange={onChangeHandler} />;
};

export default CustomEdit;
