import { REQUEST, SUCCESS, FAILURE } from "../actions/types.js";

const initialState = {
    loading: true,
    errors: [],
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case REQUEST:
            return {
                ...state,
                loading: true,
            };
        case SUCCESS:
            return {
                ...state,
                loading: false,
                errors: [],
            };
        case FAILURE:
            return {
                ...state,
                loading: false,
                errors: payload,
            };
        default:
            return state;
    }
};
