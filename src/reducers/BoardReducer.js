const ACTIONS = {
  TOGGLE_CARD_MODAL: "TOGGLE_CARD_MODAL",
  TOGGLE_LIST_MODAL: "TOGGLE_LIST_MODAL",
  ADD_LIST: "ADD_LIST",
  DELETE_LIST: "DELETE_LIST",
  ADD_CARD: "ADD_CARD",
  DELETE_CARD: "DELETE_CARD",
  UPDATE_CARD: "UPDATE_CARD",
};

export const STORAGE_KEYS = {
  LISTS: "trello_board_lists",
  CARDS: "trello_board_cards",
};

export const initialState = {
  showListModal: false,
  showCardModal: false,
  currentListId: "",
  lists: [],
  cards: [],
};

export const initializer = ([initialValue]) => {
  const existingLists = localStorage.getItem(STORAGE_KEYS.LISTS);
  const existingCards = localStorage.getItem(STORAGE_KEYS.CARDS);
  return {
    ...initialValue,
    lists: existingLists ? JSON.parse(existingLists) : initialValue.lists,
    cards: existingCards ? JSON.parse(existingCards) : initialValue.cards,
  };
};

export const listReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.TOGGLE_LIST_MODAL: {
      return {
        ...state,
        showListModal: !state.showListModal,
      };
    }
    case ACTIONS.TOGGLE_CARD_MODAL: {
      const { showCardModal } = state;
      return {
        ...state,
        showCardModal: !showCardModal,
        currentListId: showCardModal ? "" : action.payload,
      };
    }
    case ACTIONS.ADD_LIST: {
      return {
        ...state,
        lists: [...state.lists, action.payload],
      };
    }
    case ACTIONS.DELETE_LIST: {
      const deleteId = action.payload;
      return {
        ...state,
        lists: state.lists.filter(({ id }) => id !== deleteId),
        cards: state.cards.filter(({ listId }) => listId !== deleteId),
      };
    }
    case ACTIONS.ADD_CARD: {
      const { cards } = state;
      return {
        ...state,
        cards: [action.payload, ...cards],
      };
    }
    case ACTIONS.DELETE_CARD: {
      const deleteId = action.payload;
      return {
        ...state,
        cards: state.cards.filter(({ id }) => id !== deleteId),
      };
    }
    case ACTIONS.UPDATE_CARD: {
      const { cardId, newListId } = action.payload;
      const updatedCards = state.cards
        .map((card) => {
          if (card.id !== cardId) {
            return card;
          }
          return {
            ...card,
            listId: newListId,
            dateModified: new Date(),
          };
        })
        .sort((a, b) => {
          const dateA = a.dateModified;
          const dateB = b.dateModified;
          if (dateA > dateB) return -1;
          if (dateA < dateB) return 1;
          return 0;
        });
      return {
        ...state,
        cards: updatedCards,
      };
    }
    default: {
      return state;
    }
  }
};

// ** Action Creators ** //

export const toggleListModal = () => ({ type: ACTIONS.TOGGLE_LIST_MODAL });

export const toggleCardModal = (currentListId) => ({
  type: ACTIONS.TOGGLE_CARD_MODAL,
  payload: currentListId,
});

export const addNewList = (list) => ({
  type: ACTIONS.ADD_LIST,
  payload: list,
});

export const deleteList = (listId) => ({
  type: ACTIONS.DELETE_LIST,
  payload: listId,
});

export const addNewCard = (card) => ({
  type: ACTIONS.ADD_CARD,
  payload: card,
});

export const deleteCard = (cardId) => ({
  type: ACTIONS.DELETE_CARD,
  payload: cardId,
});

export const updateCard = (cardId, newListId) => ({
  type: ACTIONS.UPDATE_CARD,
  payload: { cardId, newListId },
});

// ** Action Creators ** //
