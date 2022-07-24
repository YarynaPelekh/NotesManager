import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import NotesList from "../NotesList";
import SectionHeader from "../../UI/Layout/SectionHeader";
import RequireAuth from "../../Auth/RequireAuth";
import Button from "../../UI/Button";
import Separator from "../../UI/Separator";

import { NoteType } from "../../../types/NotesTypes";

import classes from "../../../styles/Module/SearchResults.module.css";

const SearchResults = () => {
  let searchNotesResult: NoteType[] = [];

  const params = useParams();
  const navigate = useNavigate();

  const searchModeAdvanced = params.mode === ":advanced" ? true : false;
  const searchValues = params.values?.slice(1)?.split(",") || [];

  let notesList = useSelector((state: { notesSlice: { notes: NoteType[] } }) => state.notesSlice.notes) as NoteType[];
  if (searchValues.length > 0) {
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
      <div className="section">
        <SectionHeader header="Search results" />
        <div className="controlsContainer">
          <Button title="BACK" onClickButton={() => navigate(-1)} tooltip="To the previous page" />
        </div>
        {searchNotesResult.length > 0 && <NotesList notes={searchNotesResult} />}
        {searchNotesResult.length <= 0 && <p className={classes.searchMessage}>Nothing found</p>}
      </div>
    </RequireAuth>
  );
};

export default SearchResults;
