import { Fragment, useRef } from "react";
import { useSelector } from "react-redux";
import ReactTags from "react-tag-autocomplete";

import { InputNoteValues } from "../../../types/NotesTypes";

import classes from "../../../styles/Module/NotesButton.module.css";

const AddEditForm = (props: {
  formTitle: string;
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

  let i = 0;
  const tagsSuggestions = useSelector((state: { tagsSlice: { tags: string[] } }) => state.tagsSlice.tags).map(
    (item) => {
      return { id: i++, name: item };
    }
  );

  i = 0;
  let tags =
    props.initialValues.tags?.length === 0
      ? []
      : props.initialValues.tags?.split(",").map((item) => {
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
      <p className={classes.title}>{props.formTitle}</p>
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
        <ReactTags
          style={{ width: "auto" }}
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
      </div>

      <div className={classes.controlsContainer}>
        <button onClick={okHandler}>OK</button>
        <button onClick={props.modalOnCloseHandle}>Cancel</button>
      </div>
    </Fragment>
  );
};

export default AddEditForm;
