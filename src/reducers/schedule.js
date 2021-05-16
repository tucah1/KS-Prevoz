import {
    GET_AUTOCOMPLETE_RESULTS,
    GET_AUTOCOMPLETE_RESULTS_FAILURE,
    GET_LINE_SCHEDULE_FAILURE,
    GET_LINE_SCHEDULE_REQUEST,
    GET_LINE_SCHEDULE_SUCCESS,
    REMOVE_AUTOCOMPLETE_RESULTS,
    REMOVE_LINE_SCHEDULE,
} from "../actions/types";

const initialState = {
    schedule: {},
    lineInfo: {},
    loadingSchedule: false,
    results: [],
};

const schedule = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_AUTOCOMPLETE_RESULTS:
            return {
                ...state,
                results: payload,
            };
        case GET_LINE_SCHEDULE_REQUEST:
            return { ...state, loadingSchedule: true };
        case GET_LINE_SCHEDULE_SUCCESS:
            const { data, ...obj } = payload;
            return {
                ...state,
                schedule: payload.data,
                lineInfo: obj,
                loadingSchedule: false,
            };
        case REMOVE_LINE_SCHEDULE:
        case GET_LINE_SCHEDULE_FAILURE:
            return {
                ...state,
                schedule: {},
                lineInfo: {},
                loadingSchedule: false,
                results: [],
            };
        case GET_AUTOCOMPLETE_RESULTS_FAILURE:
        case REMOVE_AUTOCOMPLETE_RESULTS:
            return {
                ...state,
                results: [],
            };
        default:
            return state;
    }
};

export default schedule;
