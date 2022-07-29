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
import { appStateActions } from "../../store/app-state-slice";

import classes from "../../styles/Module/DirectoryItem.module.css";

const DirectoryItem = (props: { item: DirectoryType; children: JSX.Element }) => {
  const [itemName, setItemName] = useState(props.item.name);
  const [validationMessage, setValidationMessage] = useState("");
  const APIerror = useSelector((state: { appStateSlice: { APIerror: boolean } }) => state.appStateSlice.APIerror);

  const dispatch = useDispatch();
  useEffect(() => {
    if (APIerror) {
      setItemName(props.item.name);
    }
    dispatch(appStateActions.assignAPIerror(false));
  }, [APIerror]);

  const onChange = async (value) => {
    // serverCall().then...

    const data = Object.assign({}, props.item, { name: value });
    dispatch(directoriesActions.updateDirectoryRequest(data));
    setItemName(value);
  };

  const saveEdit = (value) => {
    const data = Object.assign({}, props.item, { name: value });
    dispatch(directoriesActions.updateDirectoryRequest(data));
    setItemName(value);
  };

  const inputValidate = (value) => {
    setValidationMessage("Directory name shouldn't be empty and more than 20 characters");
    return value.trim().length > 0 && value.trim().length <= 20;
  };

  const onCancel = () => {
    setValidationMessage("");
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
                onCancel={onCancel}
                saveButtonLabel="Save"
                cancelButtonLabel="Cancel"
                attributes={{ name: "awesome-input", id: 1 }}
                validationMessage={validationMessage}
                value={itemName}
                saveButtonStyle="inLineEditButtonStyle"
                cancelButtonStyle="inLineEditButtonStyle"
                displayComponent={<CustomDisplay />}
                editComponent={<CustomEdit />}
              />
              {/* <InlineEdit value={itemName} onChange={onChange} /> */}
              {/* <ChosenDirectory directoryId={props.item.id} /> */}
            </div>
          </NavLink>
        </div>
      </ToolTip>
      {props.children}
    </li>
  );
};

export default DirectoryItem;
