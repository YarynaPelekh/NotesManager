import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import ReactTags from "react-tag-autocomplete";

import { useNavigate } from "react-router-dom";

import { NoteType } from "../../../types/NotesTypes";

import classes from "../../../styles/Module/SearchBar.module.css";

let tagsSuggestions = [];

const SearchBar = () => {
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const searchValueRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const notes = useSelector((state: { notesSlice: { notes: NoteType[] } }) => state.notesSlice.notes);
  let i = 0;
  const tags = useSelector((state: { tagsSlice: { tags: string[] } }) => state.tagsSlice.tags).map((item) => {
    return { id: i++, name: item };
  });
  i = 0;
  let searchAutocompleteSuggestions = notes
    .map((item) => {
      return item.title.split(" ");
    })
    .flat()
    .map((item) => {
      return { id: i++, name: item };
    });

  if (isAdvancedSearch) {
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
    searchAutocompleteSuggestions = [...searchAutocompleteSuggestions, ...tags];
  }

  const onAdditionTag = (tag) => {
    tagsSuggestions.push(tag);
  };

  const onDeleteTag = (i) => {
    tagsSuggestions.splice(i, 1);
  };

  const searchButtonClick = () => {
    const searchValues = tagsSuggestions.map((item) => {
      return item.name;
    });

    // const queryParam = "mode=" + (isAdvancedSearch ? "advanced" : "simple") + "%" + searchValues;
    // /search/:type/:term
    const queryParam = (isAdvancedSearch ? "advanced" : "simple") + "/:" + searchValues;
    navigate("/search/:" + queryParam);
  };

  const searchModeHandle = () => {
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
        tags={tagsSuggestions}
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
      {/* <label htmlFor="searchMode">advanced</label> */}
      <span>advanced</span>
      <button onClick={searchButtonClick}>Search</button>
    </div>
  );
};

export default React.memo(SearchBar);
