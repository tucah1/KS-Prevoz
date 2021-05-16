import api from "../utils/api";
// import { setAlert } from "./alert";
import {
    GET_AUTOCOMPLETE_RESULTS,
    GET_AUTOCOMPLETE_RESULTS_FAILURE,
    GET_LINE_SCHEDULE_FAILURE,
    GET_LINE_SCHEDULE_REQUEST,
    GET_LINE_SCHEDULE_SUCCESS,
    REMOVE_LINE_SCHEDULE,
} from "./types";

export const getLineSchedulById = (line_id) => async (dispatch) => {
    try {
        dispatch({ type: GET_LINE_SCHEDULE_REQUEST });
        const res = await api.get(`/line/schedule-json/${line_id}`);

        dispatch({ type: GET_LINE_SCHEDULE_SUCCESS, payload: res.data });
    } catch (err) {
        console.log(err.response);
        dispatch({ type: GET_LINE_SCHEDULE_FAILURE });
    }
};

export const removeLineSchedule = () => (dispatch) => {
    try {
        dispatch({ type: REMOVE_LINE_SCHEDULE });
    } catch (err) {
        console.log(err);
    }
};

export const getAutocompleteResults = (data) => async (dispatch) => {
    try {
        console.log(data);
        const res = await api.post("/line/auto-complete", data);
        console.log(res.data);
        dispatch({ type: GET_AUTOCOMPLETE_RESULTS, payload: res.data });
    } catch (err) {
        console.log(err.response);
        dispatch({ type: GET_AUTOCOMPLETE_RESULTS_FAILURE });
    }
};
