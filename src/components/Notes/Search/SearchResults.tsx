import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import NotesList from "../NotesList";
import PageHeader from "../../UI/Layout/PageHeader";
import RequireAuth from "../../Auth/RequireAuth";

import { NoteType } from "../../../types/NotesTypes";

import classes from "../../../styles/Module/SearchResults.module.css";

const SearchResults = () => {
  let searchNotesResult: NoteType[] = [];

  const path = useLocation();
  const indexOfMode = path.pathname.indexOf(":");
  const indexOfValues = path.pathname.indexOf(":", indexOfMode + 1);
  const mode = path.pathname.slice(indexOfMode + 1, indexOfValues - 1);
  const values = path.pathname.slice(indexOfValues + 1);

  const searchModeAdvanced = mode === "advanced" ? true : false;
  const searchValues = values?.split(",") || [];

  let notesList = useSelector((state: { notesSlice: { notes: NoteType[] } }) => state.notesSlice.notes) as NoteType[];
  if (values.length > 0) {
    for (let searchValue of searchValues) {
      searchNotesResult = [
        ...searchNotesResult,
        ...notesList.filter((item: NoteType) => item.title.includes(searchValue)),
      ];
      if (searchModeAdvanced) {
        searchNotesResult = [
          ...searchNotesResult,
          ...notesList.filter((item: NoteType) => item.description.includes(searchValue)),
        ];
        searchNotesResult = [
          ...searchNotesResult,
          ...notesList.filter((item: NoteType) => item.tags.includes(searchValue)),
        ];
      }
      searchNotesResult = [...searchNotesResult.filter((v, i, a) => a.indexOf(v) === i)];
    }
  }

  return (
    <RequireAuth>
      <Fragment>
        <PageHeader header="Search results" />
        {searchNotesResult.length > 0 && <NotesList notes={searchNotesResult} />}
        {searchNotesResult.length <= 0 && <p className={classes.searchResults}>Nothing found</p>}
      </Fragment>
    </RequireAuth>
  );
};

export default SearchResults;
