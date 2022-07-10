import NotesControls from "./NotesControls";
import NotesList from "./NotesList";
import NoteDetails from "./NoteDetails";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import classes from "../../styles/Module/Notes.module.css";

const Notes = () => {
  return (
    <div className={classes.notes}>
      <p>Notes</p>
      <DndProvider backend={HTML5Backend}>
        <NotesControls />
        <NotesList />
        <NoteDetails />
      </DndProvider>
    </div>
  );
};

export default Notes;
