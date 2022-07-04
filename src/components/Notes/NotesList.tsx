import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import NoteItem from "./NoteItem";

import { appStateActions } from "../../store/app-state-slice";
import { notesActions } from "../../store/notes-slice";

import { NoteType } from "../../types/NotesTypes";
import { NotificationTypes } from "../../types/NotificationTypes";

import classes from "./NotesList.module.css";

const NotesList = () => {
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/notices");

      if (!response.ok) {
        throw new Error("Something went wrong! Fetching data from backend.");
      }
      const responseData = await response.json();

      const loadedData: NoteType[] = [];
      responseData.forEach((item: NoteType) => {
        loadedData.push({
          description: item.description,
          directoryId: item.directoryId,
          id: item.id,
          position: item.position,
          tags: item.tags,
          title: item.title,
        });
      });
      dispatch(notesActions.loadNotes(responseData));
    };

    fetchData().catch((error) => {
      console.log("fetching error", error.message);
      dispatch(
        appStateActions.setState({
          showNotification: true,
          notificationType: NotificationTypes.alertDanger,
          notificationMessage: error.message,
        })
      );
    });
    setDataIsLoaded(true);
  }, []);

  const notesList = useSelector((state: { notesSlice: { notes: NoteType[] } }) => state.notesSlice.notes) as NoteType[];

  return (
    <div className={classes.notesList}>
      Notes List
      <ul>
        {notesList.map((item: NoteType) => (
          <NoteItem key={item.id} item={item}>
            {item.title}
          </NoteItem>
        ))}
      </ul>
    </div>
  );
};

export default NotesList;
