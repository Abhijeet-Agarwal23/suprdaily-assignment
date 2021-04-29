import { useContext, useMemo } from "react";
import PropTypes from "prop-types";
import { IoMdCloseCircleOutline, IoMdAddCircle } from "react-icons/io";
import { Button } from "../Button/Button";
import { Card } from "../Card/Card";
import { BoardDispatch } from "../../contexts/BoardDispatch";
import {
  toggleCardModal,
  deleteList,
  updateCard,
} from "../../reducers/BoardReducer";
import "./List.css";

export const List = ({ listId, title, items }) => {
  const dispatch = useContext(BoardDispatch);

  const getCardsinList = (id, cards) => {
    return cards.filter(({ listId }) => {
      return listId === id;
    });
  };

  const cardsInList = useMemo(() => getCardsinList(listId, items), [
    listId,
    items,
  ]);

  const onAddBtnClick = () => {
    dispatch(toggleCardModal(listId));
  };

  const onDeleteBtnClick = () => {
    dispatch(deleteList(listId));
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDrop = (event) => {
    const cardId = event.dataTransfer.getData("cardId");
    dispatch(updateCard(cardId, listId));
  };

  return (
    <div className="list" onDragOver={onDragOver} onDrop={onDrop}>
      <div className="list-header">
        <span className="list-title">{title}</span>
        <Button className="del-list-btn" onClick={onDeleteBtnClick}>
          <IoMdCloseCircleOutline />
        </Button>
      </div>
      <div className="list-items">
        {cardsInList.map(({ id, ...cardProps }) => (
          <Card key={id} cardId={id} {...cardProps} />
        ))}
      </div>
      <div className="add-card-btn-contianer">
        <Button className="add-card-btn" onClick={onAddBtnClick}>
          <IoMdAddCircle />
        </Button>
      </div>
    </div>
  );
};

List.propTypes = {
  listId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
    }),
  ),
};
