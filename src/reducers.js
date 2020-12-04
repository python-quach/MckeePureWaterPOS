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

const membershipInitialState = {
    members: null,
    member: null,
    error: null,
};

export function membershipReducer(state = membershipInitialState, action) {
    switch (action.type) {
        case actionTypes.FIND_MEMBERSHIP:
            return {
                ...state,
                members: action.payload.memberships
                    ? action.payload.memberships
                    : null,
                member: action.payload.membership
                    ? action.payload.membership[0]
                    : null,
                error: action.payload.error ? action.payload.error : null,
            };
        case actionTypes.CLEAR_MEMBERSHIP:
            return { ...state, members: null, member: null, error: null };
        default:
            return state;
    }
}
