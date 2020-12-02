import * as actionTypes from './types';

const initialState = {
    user_id: null,
};

export function authReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.AUTHENTICATED:
            return { ...state, user_id: action.payload };
        default:
            return state;
    }
}
