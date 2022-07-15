import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import NotesList from "../NotesList";
import PageHeader from "../../UI/Layout/PageHeader";
import RequireAuth from "../../Auth/RequireAuth";

import { NoteType } from "../../../types/NotesTypes";

// import classes from "../../../styles/Module/SearchResults.module.css";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const SearchResults = () => {
  let searchNotesResult: NoteType[] = [];

  const searchParams = useQuery().get("mode");
  const mode = searchParams?.slice(0, searchParams.indexOf("%"));
  const values = searchParams?.slice(searchParams.indexOf("%") + 1);

  // const searchValues = [
  //   ...(useSelector(
  //     (state: { searchSlice: { searchValues: string[] } }) => state.searchSlice.searchValues
  //   ) as string[]),
  // ];
  // const searchModeAdvanced = useSelector(
  //   (state: { searchSlice: { advancedSearchMode: boolean } }) => state.searchSlice.advancedSearchMode
  // ) as boolean;

  let notesList = useSelector((state: { notesSlice: { notes: NoteType[] } }) => state.notesSlice.notes) as NoteType[];

  const searchModeAdvanced = mode === "advanced" ? true : false;
  const searchValues = values?.split(",") || [];

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

  return (
    <Fragment>
      <RequireAuth>
        <PageHeader header="Search results" />
        <NotesList notes={searchNotesResult} />
      </RequireAuth>
    </Fragment>
  );
};

export default SearchResults;
