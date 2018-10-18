import { combineReducers } from "redux";
import filterReducer from "./FilterReducer";
import todoReducer from "./TodoReducer";

const rootReducer = combineReducers({
  todoState: todoReducer,
  filterState: filterReducer
})

export default rootReducer;