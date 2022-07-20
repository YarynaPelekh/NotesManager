import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactTags from "react-tag-autocomplete";
import { useForm, Controller } from "react-hook-form";

import ToolTip from "../../UI/ToolTip";

import Button from "../../UI/Button";

import { NoteType } from "../../../types/NotesTypes";

import classes from "../../../styles/Module/SearchBar.module.css";
import classesModal from "../../../styles/Module/Modal.module.css";

const SearchBar = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      searchValues: [] as { id: number; name: string }[],
    },
  });

  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);

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
    const nextId = Math.max(...tags.map((item) => item.id)) + 1;
    let searchData = getValues().searchValues;
    searchData.push({ ...tag, ...{ id: nextId } });
    setValue("searchValues", searchData, { shouldValidate: true });
  };

  const onDeleteTag = (i) => {
    let searchData = getValues().searchValues;
    searchData.splice(i, 1);
    setValue("searchValues", searchData, { shouldValidate: true });
  };

  const searchButtonClick = () => {
    let searchData = getValues().searchValues;
    const searchValues = searchData.map((item) => {
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
    <ToolTip>
      <form onSubmit={handleSubmit(searchButtonClick)}>
        <div className={classes.container}>
          <div style={{ height: "20px !important" }} data-tip="Enter values for search">
            <Controller
              name="searchValues"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, ref } }) => (
                <ReactTags
                  placeholderText="Input text for search"
                  autoresize={false}
                  minQueryLength={1}
                  allowNew={true}
                  addOnBlur={true}
                  ref={ref}
                  tags={value}
                  suggestions={searchAutocompleteSuggestions}
                  onDelete={onDeleteTag}
                  onAddition={onAdditionTag}
                />
              )}
            />
            {errors?.searchValues && <p className={classesModal.errorMessage}>Search field shouldn't be empty</p>}
          </div>
          <div className={classes.flexContainer}>
            <input
              type="checkbox"
              id="searchMode"
              name="searchMode"
              value="Advanced"
              checked={isAdvancedSearch}
              onChange={searchModeHandle}
              data-tip="Change search mode"
            />
            {/* <label htmlFor="searchMode">advanced</label> */}
            <span>advanced</span>
          </div>
          {/* <Button title="Search" onClickButton={searchButtonClick} tooltip="Search notes" /> */}
          <input type="submit" value="Search" className="button" data-tip="Search notes" />
        </div>
      </form>
    </ToolTip>
  );
};

export default SearchBar;
// export default React.memo(SearchBar);
//do not include this, tag-autocomplete stop working with react-hook-form
