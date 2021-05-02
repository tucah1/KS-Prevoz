import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    CLEAR_USER,
    REQUEST,
    SUCCESS,
    FAILURE,
} from "./types";
import api from "../utils/api";
import { setAlert } from "./alert";

// Load User
export const loadUser = () => async (dispatch) => {
    const config = {
        // headers: { "Cache-Control": "max-age=0" },
    };

    try {
        dispatch({ type: REQUEST });
        const res = await api.get("/auth", config);
        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
        dispatch({ type: SUCCESS });
    } catch (err) {
        dispatch({ type: FAILURE });
        dispatch({
            type: AUTH_ERROR,
        });
    }
};

// Register User
export const register = (formData) => async (dispatch) => {
    try {
        const res = await api.post("/auth/register", formData);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
        });
        dispatch(loadUser());
    } catch (err) {
        if (err.response) {
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach((error) =>
                    dispatch(setAlert(error.message, "error"))
                );
            }
        } else {
            console.log(err);
        }

        dispatch({
            type: REGISTER_FAIL,
        });
    }
};

// Login User
export const login = (email, password) => async (dispatch) => {
    try {
        const res = await api.post("/auth/login", { email, password });

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });
        dispatch(loadUser());
    } catch (err) {
        if (err.response) {
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach((error) =>
                    dispatch(setAlert(error.message, "error"))
                );
            }
        } else {
            console.log(err);
        }

        dispatch({
            type: LOGIN_FAIL,
        });
    }
};

//google login and register
export const googleLogin = (token) => async (dispatch) => {
    try {
        const res = await api.post("/auth/google/callback", {
            googleToken: token,
        });

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });
        dispatch(loadUser());
    } catch (err) {
        if (err.response) {
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach((error) =>
                    dispatch(setAlert(error.message, "error"))
                );
            }
        } else {
            console.log(err);
        }
        dispatch({
            type: LOGIN_FAIL,
        });
    }
};

// Logout / Clear Profile
export const logout = () => (dispatch) => {
    dispatch({ type: CLEAR_USER });
    dispatch({ type: LOGOUT });
};
