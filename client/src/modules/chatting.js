const ADD_MESSAGE = "chatting/ADD_MESSAGE";
const DELETE_MESSAGES = "chatting/DELETE_MESSAGES";

export const addMessage = (message) => ({ type: ADD_MESSAGE, message });
export const deleteMessages = () => ({ type: DELETE_MESSAGES });

const initailState = [];

export default function chatting(state = initailState, action) {
  switch (action.type) {
    case ADD_MESSAGE:
      return [...state, action.message];
    case DELETE_MESSAGES:
      return [];
    default:
      return state;
  }
}
