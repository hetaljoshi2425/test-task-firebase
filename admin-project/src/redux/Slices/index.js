import { combineReducers } from "redux";
import AuthSlice from "./AuthSlice";

export default combineReducers({
    Auth: AuthSlice,
});
