import { createStore } from "redux";
import rootReducer from "../Reducers/Index";

export const store = createStore(rootReducer);