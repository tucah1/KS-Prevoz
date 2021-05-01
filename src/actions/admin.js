import api from "../utils/api";
import { setAlert } from "./alert";
import {
    FAILURE,
    GET_LINE_SCHEDULE_FILE,
    GET_NOTIFICATIONS,
    GET_SCHEDULE_LIST,
    REMOVE_LINE_SCHEDULE_FILE,
    REQUEST,
    SUCCESS,
} from "./types";

export const getScheduleList = () => async (dispatch) => {
    try {
        dispatch({ type: REQUEST });

        const res = await api.get(`/line/lines/${1}/${100}`);

        dispatch({ type: GET_SCHEDULE_LIST, payload: res.data });

        dispatch({ type: SUCCESS });
    } catch (err) {
        console.log(err.response);
        dispatch({ type: FAILURE });
    }
};

export const addNewLine = (formData) => async (dispatch) => {
    try {
        // dispatch({ type: REQUEST });
        console.log(formData);
        const res = await api.post(`/line/add-line`, formData);

        dispatch(setAlert(res.data.message, "success"));
        // dispatch({ type: SUCCESS });
    } catch (err) {
        console.log(err.response);
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
        dispatch({ type: FAILURE });
    }
};

export const getLineScheduleFile = (id) => async (dispatch) => {
    try {
        // dispatch({ type: REQUEST });
        const config = {
            responseType: "blob",
        };
        const res = api.get(`/line/schedule/${id}`, config);
        const url = window.URL.createObjectURL(new Blob([res.data]));

        dispatch({ type: GET_LINE_SCHEDULE_FILE, payload: url });
        // const blob = await res.data.blob();
        // const url = window.URL.createObjectURL(blob);

        // dispatch({ type: GET_LINE_SCHEDULE_FILE, payload: url });
        // dispatch({ type: SUCCESS });
    } catch (err) {
        console.log(err);
    }
};

export const removeScheduleFile = (url) => (dispatch) => {
    try {
        window.URL.revokeObjectURL(url);
        dispatch({ type: REMOVE_LINE_SCHEDULE_FILE });
    } catch (err) {
        console.log(err);
    }
};

export const editLine = (formData) => async (dispatch) => {
    try {
        // dispatch({ type: REQUEST });
        // console.log(formData);
        const res = await api.post(`/line/edit-line`, formData);

        dispatch(setAlert(res.data.message, "success"));
        // dispatch({ type: SUCCESS });
    } catch (err) {
        console.log(err.response);
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
        // dispatch({ type: FAILURE });
    }
};

export const deleteLine = (id) => async (dispatch) => {
    try {
        const res = await api.delete(`/line/delete-line/${id}`);
        dispatch(setAlert(res.data.message, "success"));
    } catch (err) {
        console.log(err.response);
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
    }
};

export const getNotifications = () => async (dispatch) => {
    try {
        dispatch({ type: REQUEST });
        const res = await api.get(`/notifications/getNotifications`);

        dispatch({ type: GET_NOTIFICATIONS, payload: res.data });
        dispatch({ type: SUCCESS });
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

        dispatch({ type: FAILURE });
    }
};

export const sendNotification = (formData) => async (dispatch) => {
    try {
        console.log(formData);
        const res = await api.post(`/notifications/sendNotification`, formData);

        dispatch(setAlert(res.data.message, "success"));
    } catch (err) {
        console.log(err.response);
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

        dispatch({ type: FAILURE });
    }
};
