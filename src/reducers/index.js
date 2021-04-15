import { combineReducers } from "redux";
import auth from "./auth.js";
import loading from "./loading";

export default combineReducers({
    auth,
    loading,
});
