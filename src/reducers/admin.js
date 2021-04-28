import {
    AUTH_ERROR,
    GET_LINE_SCHEDULE_FILE,
    GET_SCHEDULE_LIST,
    LOGOUT,
    REMOVE_LINE_SCHEDULE_FILE,
} from "../actions/types";

const initialState = {
    linesList: [],
    lineScheduleFile: null,
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_SCHEDULE_LIST:
            return {
                ...state,
                linesList: payload,
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
