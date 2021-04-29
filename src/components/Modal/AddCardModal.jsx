import { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import { ModalContainer } from "./ModalContainer";
import { BoardDispatch } from "../../contexts/BoardDispatch";
import { TextInput } from "../TextInput/TextInput";
import { TextArea } from "../TextArea/TextArea";
import { addNewCard, toggleCardModal } from "../../reducers/BoardReducer";

export const AddCardModal = ({ showModal, parentListId }) => {
  const [newTitle, setTitle] = useState("");
  const [newDesc, setDesc] = useState("");
  const dispatch = useContext(BoardDispatch);

  const handleTitleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTitle(value);
  };

  const handleDescChange = (event) => {
    const {
      target: { value },
    } = event;
    setDesc(value);
  };

  const onCloseBtnClick = () => {
    setTitle("");
    setDesc("");
    dispatch(toggleCardModal());
  };

  const onAddBtnClick = () => {
    const title = newTitle.trim();
    const desc = newDesc.trim();
    if (title.length > 0 && desc.length > 0) {
      const newCard = {
        id: uuidv4(),
        title,
        desc,
        listId: parentListId,
        dateModified: new Date(),
      };
      dispatch(addNewCard(newCard));
      onCloseBtnClick();
    }
  };

  return (
    <ModalContainer
      title={"Add New Card"}
      show={showModal}
      onCloseClick={onCloseBtnClick}
      onAddClick={onAddBtnClick}
    >
      <>
        <TextInput
          label={"Title"}
          placeholder={"Enter title for card"}
          value={newTitle}
          onChange={handleTitleChange}
        />
        <TextArea
          label={"Description"}
          placeholder={"Provide a description for the card"}
          value={newDesc}
          onChange={handleDescChange}
        />
      </>
    </ModalContainer>
  );
};

AddCardModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  parentListId: PropTypes.string.isRequired,
};
