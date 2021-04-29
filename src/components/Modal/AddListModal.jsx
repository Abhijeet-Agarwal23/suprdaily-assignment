import { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import { ModalContainer } from "./ModalContainer";
import { TextInput } from "../TextInput/TextInput";
import { BoardDispatch } from "../../contexts/BoardDispatch";
import { addNewList, toggleListModal } from "../../reducers/BoardReducer";

export const AddListModal = ({ showModal }) => {
  const [newListTitle, setNewListTitle] = useState("");
  const dispatch = useContext(BoardDispatch);

  const handleListTitleChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewListTitle(value);
  };

  const onCloseBtnClick = () => {
    setNewListTitle("");
    dispatch(toggleListModal());
  };

  const onAddBtnClick = () => {
    const title = newListTitle.trim();
    if (title.length > 0) {
      const newList = {
        id: uuidv4(),
        title,
      };
      dispatch(addNewList(newList));
      onCloseBtnClick();
    }
  };

  return (
    <ModalContainer
      title={"Add New List"}
      show={showModal}
      onCloseClick={onCloseBtnClick}
      onAddClick={onAddBtnClick}
    >
      <TextInput
        label={"Title"}
        placeholder={"Enter title for list"}
        value={newListTitle}
        onChange={handleListTitleChange}
      />
    </ModalContainer>
  );
};

AddListModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
};
