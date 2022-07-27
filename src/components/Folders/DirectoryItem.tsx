import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import EasyEdit, { Types } from "react-easy-edit";
import InlineEdit from "riec";
import { useDispatch, useSelector } from "react-redux";

import { DirectoryType } from "../../types/DirectoryTypes";

// import ChosenDirectory from "../../_delete/ChosenDirectory_to_delete";
import ToolTip from "../UI/ToolTip";
import CustomDisplay from "../UI/CustomDisplay";
import CustomEdit from "../UI/CustomEdit";

import { directoriesActions } from "../../store/directories-slice";
// import { appStateActions } from "../../store/app-state-slice";

import classes from "../../styles/Module/DirectoryItem.module.css";

const DirectoryItem = (props: { item: DirectoryType }) => {
  const [itemName, setItemName] = useState(props.item.name);
  const [isAPIdone, setAPIdone] = useState(false);
  const APIerror = useSelector((state: { appStateSlice: { APIerror: boolean } }) => state.appStateSlice.APIerror);
  const APIdone = useSelector((state: { appStateSlice: { APIdone: boolean } }) => state.appStateSlice.APIdone);

  const dispatch = useDispatch();
  useEffect(() => {
    setAPIdone(APIdone);
    setItemName(props.item.name);
  }, [APIdone]);

  const onChange = async (value) => {
    // serverCall().then...

    const data = Object.assign({}, props.item, { name: value });
    dispatch(directoriesActions.updateDirectoryRequest(data));
    setItemName(value);
  };

  const saveEdit = (value) => {};

  const inputValidate = (value) => {
    const data = Object.assign({}, props.item, { name: value });
    dispatch(directoriesActions.updateDirectoryRequest(data));
    setItemName(value);
    return value.trim().length > 0 && value.trim().length <= 20;
  };

  return (
    <li className={classes.li} key={props.item.id}>
      <ToolTip>
        <div
          data-tip="Choose directory"
          onClick={() => dispatch(directoriesActions.setChosenDirectoryId(String(props.item.id)))}
        >
          <NavLink
            className={({ isActive }) => `${classes.directory} ${isActive ? classes.chosen : null}`}
            to={`/directories/${props.item.id}`}
            key={props.item.id}
          >
            <div data-tip="In-line edit title">
              <EasyEdit
                type={Types.TEXT}
                onSave={saveEdit}
                onValidate={inputValidate}
                // onCancel={}
                saveButtonLabel="Save"
                cancelButtonLabel="Cancel"
                attributes={{ name: "awesome-input", id: 1 }}
                validationMessage="Directory name shouldn't be empty and more than 20 characters"
                // value={props.item.name}
                value={itemName}
                saveButtonStyle="inLineEditButtonStyle"
                cancelButtonStyle="inLineEditButtonStyle"
                displayComponent={<CustomDisplay />}
                editComponent={<CustomEdit />}
              />
              {/* <InlineEdit value={itemName} onChange={onChange} /> */}
              <p>{itemName}</p>
              {/* <ChosenDirectory directoryId={props.item.id} /> */}
            </div>
          </NavLink>
        </div>
      </ToolTip>
    </li>
  );
};

export default DirectoryItem;
