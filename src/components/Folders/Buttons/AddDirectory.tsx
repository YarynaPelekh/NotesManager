import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import Modal from "../../UI/Modal";
import Button from "../../UI/Button";
import ToolTip from "../../UI/ToolTip";

import { directoriesActions } from "../../../store/directories-slice";

import classesModal from "../../../styles/Module/Modal.module.css";

const AddDirectory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const dispatch = useDispatch();

  const chosenDirectoryId = useSelector(
    (state: { directoriesSlice: { chosenDirectoryId: string } }) => state.directoriesSlice.chosenDirectoryId
  );

  const addButtonHandler = () => {
    setIsModalShown(true);
  };

  const onSubmit = (data) => {
    addDirectoryHandler(data?.directoryName);
  };

  const addDirectoryHandler = (value) => {
    const data = JSON.stringify({
      parentId: chosenDirectoryId || "1",
      name: value,
    });
    dispatch(directoriesActions.addDirectoryRequest(data));
    setIsModalShown(false);
  };

  const modalOnCloseHandle = () => {
    setIsModalShown(false);
  };

  const addDirectoryElements = (
    <ToolTip>
      <Fragment>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className={classesModal.title}>Enter a directory name</p>
          <div className={classesModal.input}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              data-tip="Enter a directory name"
              {...register("directoryName", { required: true, maxLength: 20 })}
            />
            {String(errors?.directoryName?.type) === "required" && (
              <p className={classesModal.errorMessage}>Directory name shouldn't be empty</p>
            )}
            {String(errors?.directoryName?.type) === "maxLength" && (
              <p className={classesModal.errorMessage}>Directory name should be less than 20 characters</p>
            )}
          </div>
          <div className="controlsContainer">
            {/* <button type="submit" onClick={onSubmit}>
              OK
            </button> */}
            {/* <button onClick={modalOnCloseHandle} className={classesModal.submit}>
              Cancel
            </button> */}
            <input type="submit" value="OK" className="button" />
            <input type="button" value="Cancel" className="button" onClick={modalOnCloseHandle} />
          </div>
        </form>
      </Fragment>
    </ToolTip>
  );

  return (
    <div>
      <Button title="ADD" onClickButton={addButtonHandler} tooltip="Add directory" />
      {isModalShown && <Modal onClose={modalOnCloseHandle}>{addDirectoryElements}</Modal>}
    </div>
  );
};

export default AddDirectory;
//
