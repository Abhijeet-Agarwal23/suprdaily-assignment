import { useContext } from "react";
import PropTypes from "prop-types";
import { IoCloseSharp } from "react-icons/io5";
import { Button } from "../Button/Button";
import { BoardDispatch } from "../../contexts/BoardDispatch";
import { deleteCard } from "../../reducers/BoardReducer";
import "./Card.css";

export const Card = ({ cardId, title, desc }) => {
  const dispatch = useContext(BoardDispatch);

  const onDeleteBtnClick = () => {
    dispatch(deleteCard(cardId));
  };

  const onDragStart = (event) => {
    event.dataTransfer.setData("cardId", cardId);
  };

  return (
    <div className="trello-card" draggable={true} onDragStart={onDragStart}>
      <div className="trello-card-header">
        <div className="trello-card-title">
          <span>{title}</span>
        </div>
        <Button className="del-card-btn" onClick={onDeleteBtnClick}>
          <IoCloseSharp />
        </Button>
      </div>
      <div className="card-desc">
        <p>{desc}</p>
      </div>
    </div>
  );
};

Card.propTypes = {
  cardId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};
