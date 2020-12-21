import { channels } from './shared/constants';
import * as actionTypes from './types';

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
