import * as actionTypes from './types';

const initialState = {
    user_id: null,
};

const membershipInitialState = {
    members: null,
    member: null,
    error: null,
    field: null,
    data: null,
};

const accountInitialState = {
    account: null,
    invoices: null,
    lastRecord: null,
    lastAccount: null,
    newMember: null,
};

export function accountReducer(state = accountInitialState, action) {
    switch (action.type) {
        case actionTypes.GET_ACCOUNT:
            return action.payload;
        // return { ...state, account: action.payload };
        case actionTypes.GET_MEMBER_INVOICES:
            return {
                ...state,
                invoices: action.payload,
            };
        case actionTypes.LAST_RECORD:
            return {
                ...state,
                lastRecord: action.payload.record_id,
            };
        case actionTypes.GET_LAST_ACCOUNT:
            return {
                ...state,
                lastAccount: action.payload,
            };
        case actionTypes.ADD_NEW_MEMBER:
            return {
                ...state,
                newMember: action.payload,
            };
        case actionTypes.CLEAR_ACCOUNT:
            return {
                // ...state,
                account: null,
                invoices: null,
                lastRecord: null,
                lastAccount: null,
                newMember: null,
            };
        default:
            return state;
    }
}

export function authReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.AUTHENTICATED:
            return { ...state, user_id: action.payload };
        default:
            return state;
    }
}

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
        case actionTypes.FIND_ERROR: {
            return {
                ...state,
                error: action.payload.error
                    ? action.payload.error.message
                    : null,
                field: action.payload.error ? action.payload.error.field : null,
            };
        }
        case actionTypes.GET_CURRENT_GALLON: {
            return {
                ...state,
                data: action.payload,
            };
        }
        case actionTypes.CLEAR_MEMBERSHIP:
            return {
                ...state,
                members: null,
                member: null,
                error: null,
                field: null,
                data: null,
            };
        default:
            return state;
    }
}
