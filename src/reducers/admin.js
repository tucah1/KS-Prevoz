import {
    AUTH_ERROR,
    GET_LINE_SCHEDULE_FILE,
    GET_NOTIFICATIONS,
    GET_SCHEDULE_LIST,
    LOGOUT,
    REMOVE_LINE_SCHEDULE_FILE,
} from "../actions/types";

const initialState = {
    linesList: [],
    linesListPagesConfig: {
        pagesNumber: null,
        currentPage: 1,
    },
    lineScheduleFile: null,
    notifications: [],
};
const admin = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_SCHEDULE_LIST:
            return {
                ...state,
                linesList: payload.data,
                linesListPagesConfig: {
                    pagesNumber: payload.pages_number,
                    currentPage: payload.current_page,
                },
            };
        case GET_LINE_SCHEDULE_FILE:
            return {
                ...state,
                lineScheduleFile: payload,
            };
        case REMOVE_LINE_SCHEDULE_FILE:
            return {
                ...state,
                lineScheduleFile: null,
            };
        case GET_NOTIFICATIONS:
            return { ...state, notifications: payload };
        case AUTH_ERROR:
        case LOGOUT:
            return {
                ...state,
                linesList: [],
            };
        default:
            return state;
    }
};

export default admin;
