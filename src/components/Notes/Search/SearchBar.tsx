import { useRef } from "react";
import { useSelector } from "react-redux";
import ReactTags from "react-tag-autocomplete";

import { useNavigate } from "react-router-dom";

import { NoteType } from "../../../types/NotesTypes";

import classes from "../../../styles/Module/SearchBar.module.css";

let tags = [];

const SearchBar = () => {
  let searchValue = "";
  const searchValueRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const notes = useSelector((state: { notesSlice: { notes: NoteType[] } }) => state.notesSlice.notes);
  let i = 0;
  const searchAutocompleteSuggestions = notes
    .map((item) => {
      return item.title.split(" ");
    })
    .flat()
    .map((item) => {
      return { id: i++, name: item };
    });

  const onAdditionTag = (tag) => {
    tags.push(tag);
    searchValue = tags
      .map((item) => {
        return item.name;
      })
      .join();
  };

  const onDeleteTag = (i) => {
    tags.splice(i, 1);
    searchValue = tags
      .map((item) => {
        return item.name;
      })
      .join();
  };

  const searchButtonClick = () => {
    navigate("/notes/search", { replace: true, state: { searchValue: searchValue } });
  };

  return (
    <div className={classes.container}>
      <label htmlFor="search">Search</label>
      <ReactTags
        style={{ width: "auto" }}
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
      <button onClick={searchButtonClick}>Search</button>
    </div>
  );
};

export default SearchBar;
