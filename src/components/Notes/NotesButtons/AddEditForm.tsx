import { Fragment, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactTags from "react-tag-autocomplete";

import { InputNoteValues, TagType } from "../../../types/NotesTypes";

import { tagsActions } from "../../../store/tags-slice";

import classes from "../../../styles/Module/NotesButton.module.css";

// const suggestions = [
//   { id: 3, name: "Bananas" },
//   { id: 4, name: "Mangos" },
//   { id: 5, name: "Lemons" },
//   { id: 6, name: "Apricots" },
// ];

const AddEditForm = (props: {
  initialValues: InputNoteValues;
  saveNoteHandler: (enteredValues: InputNoteValues) => void;
  modalOnCloseHandle: () => void;
}) => {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const tagsInputRef = useRef<HTMLInputElement>(null);
  const reactTags = useRef(null);

  let enteredTitle = "";
  let enteredDescription = "";
  let enteredTags = "";

  const dispatch = useDispatch();

  let i = 0;
  const tagsSuggestions = useSelector((state: { tagsSlice: { tags: string[] } }) => state.tagsSlice.tags).map(
    (item) => {
      return { id: i++, name: item };
    }
  );

  i = 0;
  let tags =
    props.initialValues.tags.length === 0
      ? []
      : props.initialValues.tags.split(",").map((item) => {
          return { id: i++, name: item };
        });

  const okHandler = () => {
    enteredTitle = titleInputRef.current?.value || "";
    enteredDescription = descriptionInputRef.current?.value || "";
    enteredTags = tagsInputRef.current?.value || "";
    enteredTags = tags
      .map((item) => {
        return item.name;
      })
      .join();
    if (enteredTitle.trim().length === 0) {
      alert("Please, enter a valid note title!");
    } else if (enteredDescription.trim().length === 0) {
      alert("Please, enter a valid note description!");
    } else if (enteredTags.trim().length === 0) {
      alert("Please, enter a valid note tags!");
    } else {
      props.saveNoteHandler({
        title: enteredTitle,
        description: enteredDescription,
        tags: enteredTags,
      });
    }
  };

  const onAdditionTag = (tag) => {
    tags.push(tag);
  };

  const onDeleteTag = (i) => {
    tags.splice(i, 1);
  };

  return (
    <Fragment>
      <p>Input a new note</p>
      <div className={classes.input}>
        <label htmlFor="title">Title</label>
        <input id="title" ref={titleInputRef} defaultValue={props.initialValues.title}></input>
      </div>
      <div className={classes.input}>
        <label htmlFor="description">Description</label>
        <textarea id="description" ref={descriptionInputRef} defaultValue={props.initialValues.description}></textarea>
      </div>
      {/* <div className={classes.input}>
        <label htmlFor="tags">Tags</label>
        <input id="tags" ref={tagsInputRef} defaultValue={props.initialValues.tags}></input>
      </div> */}

      <ReactTags
        style={{ width: "200px" }}
        autoresize={false}
        minQueryLength={1}
        allowNew={true}
        addOnBlur={true}
        ref={reactTags}
        tags={tags}
        suggestions={tagsSuggestions}
        onDelete={onDeleteTag}
        onAddition={onAdditionTag}
      />

      <div className={classes.controlsContainer}>
        <button onClick={okHandler}>OK</button>
        <button onClick={props.modalOnCloseHandle}>Cancel</button>
      </div>
    </Fragment>
  );
};

export default AddEditForm;
