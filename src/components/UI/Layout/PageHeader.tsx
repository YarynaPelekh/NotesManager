import { useNavigate } from "react-router-dom";

import classes from "../../../styles/Module/PageHeader.module.css";

const PageHeader = (props: { header: string }) => {
  const navigate = useNavigate();

  return (
    <div className={classes.header}>
      <p>{props.header}</p>
      <div className={classes.button}>
        <button onClick={() => navigate(-1)}>BACK</button>
      </div>
    </div>
  );
};

export default PageHeader;
