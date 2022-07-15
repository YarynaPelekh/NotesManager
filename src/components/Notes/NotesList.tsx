import React from "react";

import NoteItem from "./NoteItem";
import { NoteType } from "../../types/NotesTypes";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import classes from "../../styles/Module/NotesList.module.css";

const NotesList = (props: { notes: NoteType[] }) => {
  return (
    <div className={classes.notesList}>
      <DndProvider backend={HTML5Backend}>
        <div>
          <ul className={classes.ul}>
            {props.notes && props.notes.map((item: NoteType) => <NoteItem key={item.id} item={item} />)}
          </ul>
        </div>
      </DndProvider>
    </div>
  );
};

export default NotesList;
