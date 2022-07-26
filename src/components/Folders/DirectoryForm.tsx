import React from "react";

import { useForm } from "react-hook-form";

import classesModal from "../../styles/Module/Modal.module.css";

const DirectoryForm = (props: { submitHandle: (data) => void; modalOnCloseHandle: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(props.submitHandle)}>
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
        <input type="button" value="Cancel" className="button" onClick={props.modalOnCloseHandle} />
      </div>
    </form>
  );
};

export default DirectoryForm;
