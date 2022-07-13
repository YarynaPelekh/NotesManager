import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactTags from "react-tag-autocomplete";

import { useNavigate } from "react-router-dom";

import { searchActions } from "../../../store/search-slice";

import { NoteType } from "../../../types/NotesTypes";

import classes from "../../../styles/Module/SearchBar.module.css";

let tags = [];

const SearchBar = () => {
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const searchValueRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notes = useSelector((state: { notesSlice: { notes: NoteType[] } }) => state.notesSlice.notes);
  let i = 0;
  const tagsSuggestions = useSelector((state: { tagsSlice: { tags: string[] } }) => state.tagsSlice.tags).map(
    (item) => {
      return { id: i++, name: item };
    }
  );
  let searchValues = [
    ...(useSelector(
      (state: { searchSlice: { searchValues: string[] } }) => state.searchSlice.searchValues
    ) as string[]),
  ];
  const searchModeAdvanced = useSelector(
    (state: { searchSlice: { advancedSearchMode: boolean } }) => state.searchSlice.advancedSearchMode
  ) as boolean;

  useEffect(() => {
    setIsAdvancedSearch(searchModeAdvanced);
  }, [searchModeAdvanced]);

  i = 0;
  let searchAutocompleteSuggestions = notes
    .map((item) => {
      return item.title.split(" ");
    })
    .flat()
    .map((item) => {
      return { id: i++, name: item };
    });

  if (searchModeAdvanced) {
    searchAutocompleteSuggestions = [
      ...searchAutocompleteSuggestions,
      ...notes
        .map((item) => {
          return item.description.split(" ");
        })
        .flat()
        .map((item) => {
          return { id: i++, name: item };
        }),
    ];
    searchAutocompleteSuggestions = [...searchAutocompleteSuggestions, ...tagsSuggestions];
  }

  const onAdditionTag = (tag) => {
    tags.push(tag);
    searchValues = tags.map((item) => {
      return item.name;
    });
  };

  const onDeleteTag = (i) => {
    tags.splice(i, 1);
    searchValues = tags.map((item) => {
      return item.name;
    });
  };

  const searchButtonClick = () => {
    dispatch(searchActions.storeSearchValues(searchValues));
    const queryParam = "mode=" + (isAdvancedSearch ? "advanced" : "simple") + "%" + searchValues;
    navigate("/notes/search?" + queryParam);
  };

  const searchModeHandle = () => {
    dispatch(searchActions.setAdvancedSearchMode(!isAdvancedSearch));
    setIsAdvancedSearch(!isAdvancedSearch);
  };

  return (
    <div className={classes.container}>
      <ReactTags
        placeholderText="Input text for search"
        autoresize={false}
        minQueryLength={1}
        allowNew={true}
        addOnBlur={true}
        ref={searchValueRef}
        tags={tags}
        suggestions={searchAutocompleteSuggestions}
        onDelete={onDeleteTag}
        onAddition={onAdditionTag}
      />
      <input
        type="checkbox"
        id="searchMode"
        name="searchMode"
        value="Advanced"
        checked={isAdvancedSearch}
        onChange={searchModeHandle}
      />
      <label htmlFor="searchMode">advanced</label>
      <button onClick={searchButtonClick}>Search</button>
    </div>
  );
};

export default React.memo(SearchBar);
