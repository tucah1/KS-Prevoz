import {
    USER_LOADED,
    AUTH_ERROR,
    LOGOUT,
    CLEAR_USER,
    UPDATE_USER,
    GET_FAVORITES,
    DELETE_FAVORITE_LINE,
} from "../actions/types";

const initialState = {
    user: null,
    favorites: [],
    initials: null,
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                user: payload,
                initials:
                    payload.first_name.charAt(0).toUpperCase() +
                    payload.last_name.charAt(0).toUpperCase(),
            };
        case UPDATE_USER:
            return {
                ...state,
                user: { ...state.user, ...payload },
                initials:
                    payload.first_name.charAt(0).toUpperCase() +
                    payload.last_name.charAt(0).toUpperCase(),
            };
        case GET_FAVORITES:
            return {
                ...state,
                favorites: payload,
            };
        case DELETE_FAVORITE_LINE:
            return {
                ...state,
                favorites: state.favorites.filter(
                    (fav) => fav.line_id !== payload
                ),
            };
        case AUTH_ERROR:
        case CLEAR_USER:
        case LOGOUT:
            return {
                ...state,
                favorites: [],
                user: null,
                initials: null,
            };
        default:
            return state;
    }
};
