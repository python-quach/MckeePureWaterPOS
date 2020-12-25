import { channels } from './shared/constants';
import * as actionTypes from './types';
import { reset } from 'redux-form';

const { ipcRenderer } = window;

export const printReceipt = (receipt, callback) => (dispatch) => {
    ipcRenderer.send(channels.PRINT_RECEIPT, { receipt });
    ipcRenderer.on(channels.PRINT_RECEIPT, (event, args) => {
        ipcRenderer.removeAllListeners(channels.PRINT_RECEIPT);
    });
};

export const buy = (data, callback) => (dispatch) => {
    ipcRenderer.send(channels.BUY_WATER, data);
    ipcRenderer.on(channels.BUY_WATER, (event, args) => {
        ipcRenderer.removeAllListeners(channels.BUY_WATER);
        callback(args);
    });
};
export const renew = (data, callback) => (dispatch) => {
    ipcRenderer.send(channels.RENEW_WATER, data);
    ipcRenderer.on(channels.RENEW_WATER, (event, args) => {
        ipcRenderer.removeAllListeners(channels.RENEW_WATER);
        callback(args);
    });
};

export const getLastRecord = (callback) => (dispatch) => {
    ipcRenderer.send(channels.LAST_RECORD);
    ipcRenderer.on(channels.LAST_RECORD, (event, lastRecord) => {
        ipcRenderer.removeAllListeners(channels.LAST_RECORD);
        dispatch({
            type: actionTypes.LAST_RECORD,
            payload: lastRecord,
        });
        callback(lastRecord);
    });
};

export const getAccount = (account, callback) => (dispatch) => {
    ipcRenderer.send(channels.GET_ACCOUNT, { account });

    ipcRenderer.on(channels.GET_ACCOUNT, (event, response) => {
        ipcRenderer.removeAllListeners(channels.GET_ACCOUNT);
        dispatch({ type: actionTypes.GET_ACCOUNT, payload: response });
        callback(response);
    });
};

export const getAccountInvoices = (account, callback) => (dispatch) => {
    ipcRenderer.send(channels.GET_MEMBER_INVOICES, {
        account,
    });
    ipcRenderer.on(channels.GET_MEMBER_INVOICES, (event, args) => {
        ipcRenderer.removeAllListeners(channels.GET_MEMBER_INVOICES);
        console.log({ args });
        dispatch({
            type: actionTypes.GET_MEMBER_INVOICES,
            payload: args,
        });
        callback(args);
    });
};

export const getLastAccount = (callback) => (dispatch) => {
    ipcRenderer.send(channels.GET_LAST_ACCOUNT);
    ipcRenderer.on(channels.GET_LAST_ACCOUNT, (event, response) => {
        ipcRenderer.removeAllListeners(channels.GET_LAST_ACCOUNT);
        const { account } = response;
        dispatch({
            type: actionTypes.GET_LAST_ACCOUNT,
            payload: account,
        });
        callback(account);
    });
};

// FIND FORM ACTIONS:

// export const getAccount = (account, callback) => (dispatch) {
//     ipcRenderer.send(channels.GET_ACCOUNT, { account });

//     ipcRenderer.on(channels.GET_ACCOUNT, (event, response) => {
//         ipcRenderer.removeAllListeners(channels.GET_ACCOUNT);
//         // console.log(response);
//         dispatch({ type: actionTypes.GET_ACCOUNT, payload: response });
//         callback();
//     });
// },
export const getLast = (callback) => (dispatch) => {
    ipcRenderer.send(channels.LAST_RECORD);
    ipcRenderer.on(channels.LAST_RECORD, (event, lastRecord) => {
        ipcRenderer.removeAllListeners(channels.LAST_RECORD);
        dispatch({
            type: actionTypes.LAST_RECORD,
            payload: lastRecord,
        });
        callback();
    });
};

export const clearForm = () => (dispatch) => {
    dispatch(reset('membership'));
};

export const clearMembership = () => (dispatch) => {
    dispatch({ type: actionTypes.CLEAR_MEMBERSHIP });
};

export const focusInput = (name) => {
    document.getElementById(name).focus();
};

export const find = ({ phone, account, firstName, lastName }, callback) => (
    dispatch
) => {
    ipcRenderer.send(channels.FIND_MEMBERSHIP, {
        phone,
        account,
        firstName,
        lastName,
    });
    ipcRenderer.on(channels.FIND_MEMBERSHIP, (event, response) => {
        ipcRenderer.removeAllListeners(channels.FIND_MEMBERSHIP);
        if (response.error) {
            dispatch({
                type: actionTypes.FIND_ERROR,
                payload: response,
            });
        } else {
            dispatch({
                type: actionTypes.FIND_MEMBERSHIP,
                payload: response,
            });
        }

        callback(response);
    });
};
