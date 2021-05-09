import { REQUEST, SUCCESS, FAILURE } from "../actions/types.js";

const initialState = {
    loading: true,
    errors: [],
};

const loading = (state = initialState, { type, payload }) => {
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

export default loading;
