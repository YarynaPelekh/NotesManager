import React, { Fragment, useRef } from "react";
import { useSelector } from "react-redux";
import ReactTags from "react-tag-autocomplete";
import { useForm, Controller } from "react-hook-form";

import ToolTip from "../../UI/ToolTip";

import { InputNoteValues } from "../../../types/NotesTypes";

import classesModal from "../../../styles/Module/Modal.module.css";

const AddEditForm = (props: {
  formTitle: string;
  initialValues: InputNoteValues;
  saveNoteHandler: (enteredValues: InputNoteValues) => void;
  modalOnCloseHandle: () => void;
}) => {
  let i = 0;
  let tags =
    props.initialValues.tags?.length === 0
      ? []
      : props.initialValues.tags?.split(",").map((item) => {
          return { id: i++, name: item };
        });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      noteName: props.initialValues.title,
      noteDescription: props.initialValues.description,
      noteTags: tags,
    },
  });

  i = 0;
  const tagsSuggestions = useSelector((state: { tagsSlice: { tags: string[] } }) => state.tagsSlice.tags).map(
    (item) => {
      return { id: i++, name: item };
    }
  );

  // const titleInputRef = useRef<HTMLInputElement>(null);
  // const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  // const tagsInputRef = useRef<HTMLInputElement>(null);
  // const reactTags = useRef(null);

  // let enteredTitle = "";
  // let enteredDescription = "";
  // let enteredTags = "";

  // const okHandler = () => {
  //   enteredTitle = titleInputRef.current?.value || "";
  //   enteredDescription = descriptionInputRef.current?.value || "";
  //   enteredTags = tagsInputRef.current?.value || "";
  //   enteredTags = tags
  //     .map((item) => {
  //       return item.name;
  //     })
  //     .join();
  //   if (enteredTitle.trim().length === 0) {
  //     alert("Please, enter a valid note title!");
  //   } else if (enteredDescription.trim().length === 0) {
  //     alert("Please, enter a valid note description!");
  //   } else if (enteredTags.trim().length === 0) {
  //     alert("Please, enter a valid note tags!");
  //   } else {
  //     props.saveNoteHandler({
  //       title: enteredTitle,
  //       description: enteredDescription,
  //       tags: enteredTags,
  //     });
  //   }
  // };

  const onSubmit = (data) => {
    props.saveNoteHandler({
      title: data.noteName,
      description: data.noteDescription,
      tags: data.noteTags
        .map((item) => {
          return item.name;
        })
        .join(),
    });
  };

  const onAdditionTag = (tag) => {
    const nextId = Math.max(...tags.map((item) => item.id)) + 1;

    let noteTags = getValues().noteTags;
    noteTags.push({ ...tag, ...{ id: nextId } });
    setValue("noteTags", noteTags, { shouldValidate: true });
  };

  const onDeleteTag = (i) => {
    let noteTags = getValues().noteTags;
    noteTags.splice(i, 1);
    setValue("noteTags", noteTags, { shouldValidate: true });
  };

  return (
    <ToolTip>
      <Fragment>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className={classesModal.title}>{props.formTitle}</p>
          <div className={classesModal.input}>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              // ref={titleInputRef}
              defaultValue={props.initialValues.title}
              data-tip="Enter note title"
              {...register("noteName", { required: true, maxLength: 20 })}
            />
            {String(errors?.noteName?.type) === "required" && (
              <p className={classesModal.errorMessage}>Note name shouldn't be empty</p>
            )}
            {String(errors?.noteName?.type) === "maxLength" && (
              <p className={classesModal.errorMessage}>Note name should be less than 20 characters</p>
            )}
          </div>
          <div className={classesModal.input}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              // ref={descriptionInputRef}
              defaultValue={props.initialValues.description}
              data-tip="Enter note description"
              {...register("noteDescription", { required: true, maxLength: 200 })}
            />
          </div>
          {String(errors?.noteDescription?.type) === "required" && (
            <p className={classesModal.errorMessage}>Note desciption shouldn't be empty</p>
          )}
          {String(errors?.noteDescription?.type) === "maxLength" && (
            <p className={classesModal.errorMessage}>Note desciption should be less than 200 characters</p>
          )}
          <div className={classesModal.input} data-tip="Enter note tags">
            <label htmlFor="tags">Tags</label>
            <Controller
              name="noteTags"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, ref } }) => (
                <ReactTags
                  style={{ width: "auto" }}
                  autoresize={false}
                  minQueryLength={1}
                  allowNew={true}
                  addOnBlur={true}
                  ref={ref}
                  tags={value}
                  suggestions={tagsSuggestions}
                  onDelete={onDeleteTag}
                  onAddition={onAdditionTag}
                  // {...field}
                />
              )}
            />
          </div>
          {String(errors?.noteTags?.type) === "required" && (
            <p className={classesModal.errorMessage}>Note tags shouldn't be empty</p>
          )}
          <div className={classesModal.controlsContainer}>
            {/* <button onClick={okHandler}>
              OK
            </button> */}
            {/* <button type="submit" onClick={onSubmit}>
              OK
            </button> */}
            <input type="submit" />
            <button onClick={props.modalOnCloseHandle}>Cancel</button>
          </div>
        </form>
      </Fragment>
    </ToolTip>
  );
};

export default AddEditForm;
