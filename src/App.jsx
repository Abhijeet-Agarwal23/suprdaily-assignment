import { useReducer, useEffect } from "react";
import { Button, AddListModal, AddCardModal, List } from "./components";
import { BoardDispatch } from "./contexts/BoardDispatch";
import {
  initialState,
  listReducer,
  toggleListModal,
  initializer,
  STORAGE_KEYS,
} from "./reducers/BoardReducer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export const STORAGE_KEY = "trello-board";

const App = () => {
  const [state, dispatch] = useReducer(
    listReducer,
    [initialState],
    initializer,
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LISTS, JSON.stringify(state.lists));
  }, [state.lists]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CARDS, JSON.stringify(state.cards));
  }, [state.cards]);

  const handleListModal = () => {
    dispatch(toggleListModal());
  };

  return (
    <div className="trello-app">
      <header className="app-header">
        <h1>Trello Board</h1>
      </header>
      <div className="add-btn-container">
        <Button className="btn-primary" onClick={handleListModal}>
          ADD LIST
        </Button>
      </div>
      <BoardDispatch.Provider value={dispatch}>
        <div className="list-container">
          {state.lists &&
            state.lists.map(({ id, title }) => (
              <List key={id} listId={id} title={title} items={state.cards} />
            ))}
        </div>
        <AddListModal showModal={state.showListModal}></AddListModal>
        <AddCardModal
          showModal={state.showCardModal}
          parentListId={state.currentListId}
        />
      </BoardDispatch.Provider>
    </div>
  );
};

export default App;
