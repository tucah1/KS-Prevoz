import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
} from "../actions/types";

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    userLevel: 0,
    user: null,
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    // const { app_user_access, ...user } = payload;

    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                user: payload,
                userLevel: payload.app_user_access,
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem("token", payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
            };
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                user: null,
                userLevel: 0,
            };
        default:
            return state;
    }
};
