import NotesControls from "./NotesControls";
import NotesList from "./NotesList";

import classes from "../../styles/Module/Notes.module.css";

const Notes = () => {
  return (
    <div className={classes.notes}>
      Notes component
      <NotesControls />
      <NotesList />
    </div>
  );
};

export default Notes;
