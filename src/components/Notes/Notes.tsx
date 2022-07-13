import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import NotesList from "./NotesList";
import NoteDetails from "./NoteDetails";
import NotesControls from "./NotesControls";
import SearchBar from "./Search/SearchBar.tsx";

import { appStateActions } from "../../store/app-state-slice";
import { notesActions } from "../../store/notes-slice";
import { tagsActions } from "../../store/tags-slice";

import { NoteType } from "../../types/NotesTypes";
import { NotificationTypes } from "../../types/NotificationTypes";

import classes from "../../styles/Module/Notes.module.css";

const Notes = () => {
  const dispatch = useDispatch();

  const chosenDirectoryId = useSelector(
    (state: { directoriesSlice: { chosenDirectoryId: string } }) => state.directoriesSlice.chosenDirectoryId
  );
  let notesList = [
    ...(useSelector((state: { notesSlice: { notes: NoteType[] } }) => state.notesSlice.notes) as NoteType[]),
  ];

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

      const tagsString = responseData
        .map((item) => {
          return item.tags;
        })
        .join()
        .split(",")
        .filter((v, i, a) => a.indexOf(v) === i)
        .join();

      dispatch(tagsActions.loadTags(tagsString));
    };

    if (notesList.length === 0) {
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
    }
  }, []);

  notesList = notesList
    .sort((a, b) => {
      return a.position - b.position;
    })
    .filter((item: NoteType) => item.directoryId === chosenDirectoryId);

  return (
    <div className={classes.notes}>
      <p>Notes</p>
      <NotesControls />
      <NotesList notes={notesList} />
      <SearchBar />
    </div>
  );
};

export default Notes;
