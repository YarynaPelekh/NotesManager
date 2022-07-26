import React from "react";

import AddNote from "./NotesActions/AddNote";
import EditNote from "./NotesActions/EditNote";
import RemoveNote from "./NotesActions/RemoveNote";

import classes from "../../styles/Module/DirectoriesControls.module.css";

const NotesControls = () => {
  return (
    <div className="controlsContainer shadow">
      <AddNote />
      <EditNote />
      <RemoveNote />
    </div>
  );
};

export default NotesControls;
