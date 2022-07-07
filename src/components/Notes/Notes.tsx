import NotesControls from "./NotesControls";
import NotesList from "./NotesList";
import ContainerDnD from "./ContainerDnD";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import classes from "../../styles/Module/Notes.module.css";

const Notes = () => {
  return (
    <div className={classes.notes}>
      Notes component
      <DndProvider backend={HTML5Backend}>
        <NotesControls />
        <NotesList />
        {/* <ContainerDnD /> */}
      </DndProvider>
    </div>
  );
};

export default Notes;
