import { combineReducers } from "redux";
import user from "./user";
import chatting from "./chatting";

const rootReducer = combineReducers({
  user,
  chatting,
});

export default rootReducer;
