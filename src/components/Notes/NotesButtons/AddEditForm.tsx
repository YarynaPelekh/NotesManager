import { Fragment, useRef } from "react";

import { InputNoteValues } from "../../../types/NotesTypes";

import classes from "../../../styles/Module/NotesButton.module.css";

const AddEditForm = (props: {
  initialValues: InputNoteValues;
  saveNoteHandler: (enteredValues: InputNoteValues) => void;
  modalOnCloseHandle: () => void;
}) => {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const tagsInputRef = useRef<HTMLInputElement>(null);

  let enteredTitle = "";
  let enteredDescription = "";
  let enteredTags = "";

  const okHandler = () => {
    enteredTitle = titleInputRef.current?.value || "";
    enteredDescription = descriptionInputRef.current?.value || "";
    enteredTags = tagsInputRef.current?.value || "";
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
      <div className={classes.input}>
        <label htmlFor="tags">Tags</label>
        <input id="tags" ref={tagsInputRef} defaultValue={props.initialValues.tags}></input>
      </div>
      <div className={classes.controlsContainer}>
        <button onClick={okHandler}>OK</button>
        <button onClick={props.modalOnCloseHandle}>Cancel</button>
      </div>
    </Fragment>
  );
};

export default AddEditForm;
