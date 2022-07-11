import NoteItem from "./NoteItem";

import { NoteType } from "../../types/NotesTypes";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import classes from "../../styles/Module/NotesList.module.css";

const NotesList = (props: { notes: NoteType[] }) => {
  return (
    <div className={classes.notesList}>
      {/* <p> Notes List</p> */}

      <DndProvider backend={HTML5Backend}>
        <div className={classes.ul}>
          <ul>
            {props.notes &&
              props.notes.map((item: NoteType) => (
                <NoteItem key={item.id} item={item}>
                  <p></p>
                </NoteItem>
              ))}
          </ul>
        </div>
      </DndProvider>
    </div>
  );
};

export default NotesList;
