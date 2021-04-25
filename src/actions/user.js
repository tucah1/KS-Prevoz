import {
    REQUEST,
    SUCCESS,
    FAILURE,
    UPDATE_USER,
    GET_FAVORITES,
    DELETE_FAVORITE_LINE,
} from "./types";
import api from "../utils/api";
import { setAlert } from "./alert";

export const updateSettings = (obj) => async (dispatch) => {
    try {
        dispatch({ type: REQUEST });
        const res = await api.post("/auth/edit-profile", obj);

        dispatch({
            type: UPDATE_USER,
            payload: {
                first_name: obj.first_name,
                last_name: obj.last_name,
                email: obj.email,
                notifications: obj.notifications,
            },
        });
        dispatch({ type: SUCCESS });
        dispatch(setAlert(res.data.message, "success"));
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => {
                dispatch(setAlert(error.message, "error"));
            });
        }

        dispatch({
            type: FAILURE,
        });
    }
};

export const getFavorites = () => async (dispatch) => {
    try {
        dispatch({ type: REQUEST });

        const res = await api.get("/favorites/getFavorites");

        dispatch({
            type: GET_FAVORITES,
            payload: res.data,
        });
        dispatch({ type: SUCCESS });
    } catch (err) {
        console.log(err.response);
        dispatch({
            type: FAILURE,
        });
    }
};

export const deleteFavoriteLine = (line_id) => async (dispatch) => {
    try {
        console.log(line_id);
        const res = await api.delete("/favorites/deleteFavorite", {
            data: { line_id },
        });

        dispatch({
            type: DELETE_FAVORITE_LINE,
            payload: line_id,
        });
        dispatch(setAlert(res.data.message, "success"));
    } catch (err) {
        console.log(err);
        // const errors = err.response.data.errors;
        // if (errors) {
        //     errors.forEach((error) => {
        //         dispatch(setAlert(error.message, "error"));
        //     });
        // }
    }
};
