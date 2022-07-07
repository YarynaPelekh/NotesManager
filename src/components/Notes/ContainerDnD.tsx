import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";

import { notesActions } from "../../store/notes-slice";

import { DnDTypes } from "../../types/DnDTypes";
import { NoteType } from "../../types/NotesTypes";

import classes from "../../styles/Module/ContainerDnD.module.css";

const ContainerDnD = (props: { noteTo: NoteType }) => {
  const [element, setElement] = useState("");
  const dispatch = useDispatch();

  const chosenDirectoryId = useSelector(
    (state: { directoriesSlice: { chosenDirectoryId: string } }) => state.directoriesSlice.chosenDirectoryId
  );

  const notesList = useSelector((state: { notesSlice: { notes: NoteType[] } }) => state.notesSlice.notes) as NoteType[];
  // console.log("notesList", notesList);

  const moveItem = (itemFrom, notesList) => {
    // console.log("drop function is called", itemFrom.noteId);
    // console.log("notesList in moveItem", notesList);
    const selectedNotes = notesList.filter((item: NoteType) => item.directoryId === chosenDirectoryId);
    // console.log("selectedNotes", selectedNotes);

    // console.log("noteId", itemFrom.noteId);
    const noteFrom = notesList.filter((item: NoteType) => item.id === +itemFrom.noteId)[0];
    // console.log("noteFrom", noteFrom);

    // console.log("from", noteFrom.position, noteFrom.title); //, noteFrom);
    // console.log("to", props.noteTo.position, props.noteTo.title); //, props.noteTo);

    let positionFrom = noteFrom.position;
    console.log("positionFrom", positionFrom);

    dispatch(notesActions.updateNote(Object.assign({}, noteFrom, { position: props.noteTo.position })));
    dispatch(notesActions.updateNote(Object.assign({}, props.noteTo, { position: positionFrom })));

    setElement(itemFrom.noteId);
  };

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: DnDTypes.noteItem,
      drop: (itemFrom, monitor) => moveItem(itemFrom, monitor),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  return (
    <div className={classes.containerDnD} ref={drop}>
      {/* {<p>{`element ${element}`}</p>} */}
      {<p>{`${props.noteTo.title}`}</p>}
    </div>
  );
};
export default ContainerDnD;
