import { combineReducers } from "redux";
import auth from "./auth.js";
import user from "./user.js";
import loading from "./loading";
import alert from "./alert";
import admin from "./admin";

export default combineReducers({
    auth,
    alert,
    user,
    loading,
    admin,
});
