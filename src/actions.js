import { channels } from './shared/constants';
import * as actionTypes from './types';
import { reset, change } from 'redux-form';

const { ipcRenderer } = window;

export const printReceipt = (receipt, callback) => (dispatch) => {
    ipcRenderer.send(channels.PRINT_RECEIPT, { receipt });
    ipcRenderer.on(channels.PRINT_RECEIPT, (event, args) => {
        ipcRenderer.removeAllListeners(channels.PRINT_RECEIPT);
    });
};

export const buy = (data, callback) => (dispatch) => {
    console.log(data);
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

export const totalInvoice = (account, callback) => (dispatch) => {
    console.log(account);
    ipcRenderer.send(channels.GET_TOTAL_INVOICE, { account });
    ipcRenderer.on(channels.GET_TOTAL_INVOICE, (event, args) => {
        ipcRenderer.removeAllListeners(channels.GET_TOTAL_INVOICE);
        console.log({ args });
        callback(args);
    });
};

export const getAccountInvoices = (account, limit, offset, callback) => (
    dispatch
) => {
    ipcRenderer.send(channels.GET_MEMBER_INVOICES, {
        account,
        limit,
        offset,
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

export const resetBuyForm = () => (dispatch) => {
    console.log('reset buy edit');
    dispatch(reset('buy'));
};

export const changeName = (value) => (dispatch) => {
    dispatch(change('buy', 'fullname', value));
};

export const clearMembership = () => (dispatch) => {
    dispatch({ type: actionTypes.CLEAR_MEMBERSHIP });
};

export const focusInput = (name) => (dispatch) => {
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

export const addNewMembership = (data, callback) => (dispatch) => {
    console.log(data);
    ipcRenderer.send(channels.ADD_NEW_MEMBER, data);
    ipcRenderer.on(channels.ADD_NEW_MEMBER, (event, response) => {
        ipcRenderer.removeAllListeners(channels.ADD_NEW_MEMBER);
        console.log('response', response);
        dispatch({
            type: actionTypes.ADD_NEW_MEMBER,
            payload: response,
        });
        callback();
    });
};

// LOGIN USER ACTION
export const clearFormUser = () => (dispatch) => dispatch(reset('user'));
export const clearAddForm = () => (dispatch) => dispatch(reset('add'));
export const clearFindForm = () => (dispatch) => dispatch(reset('find'));
export const clearBuyForm = () => (dispatch) => dispatch(reset('buy'));

export const clearAccount = () => (dispatch) =>
    dispatch({ type: actionTypes.CLEAR_ACCOUNT });

export const login = (username, password, callback) => (dispatch) => {
    ipcRenderer.send(channels.LOGIN_USER, { username, password });
    ipcRenderer.on(
        channels.LOGIN_USER,
        (event, { error, user_id, username }) => {
            ipcRenderer.removeAllListeners(channels.LOGIN_USER);

            if (error) {
                callback(error, null);
            } else {
                dispatch({
                    type: actionTypes.AUTHENTICATED,
                    payload: user_id,
                });
                callback(error, { user_id, username });
            }
        }
    );
};

// UPDATE MEMBERSHIP INFO
export const updateMembership = (
    { areaCode, phone, firstName, lastName, account },
    callback
) => (dispatch) => {
    console.log(areaCode, phone, firstName, lastName, account);
    dispatch({
        type: actionTypes.UPDATE_ACCOUNT,
        payload: { areaCode, phone, firstName, lastName },
    });
    ipcRenderer.send(channels.UPDATE_MEMBER, {
        areaCode,
        phone,
        firstName,
        lastName,
        account,
    });
    ipcRenderer.on(channels.UPDATE_MEMBER, (event, response) => {
        ipcRenderer.removeAllListeners(channels.UPDATE_MEMBER);
        console.log({ response });
        dispatch({ type: actionTypes.UPDATE_MEMBER, payload: response });
        // dispatch({
        //     type: actionTypes.UPDATE_ACCOUNT,
        //     payload: { areaCode, phone, firstName, lastName, account },
        // });
        callback(response);
    });
};
// GET TOTAL RENEWAL FEE
export const getTotalRenewalFee = (account, callback) => (dispatch) => {
    console.log(`getTotalRenewFee`, { account });
    ipcRenderer.send(channels.GET_TOTAL_FEE, { account });
    ipcRenderer.on(channels.GET_TOTAL_FEE, (event, response) => {
        ipcRenderer.removeAllListeners(channels.GET_TOTAL_FEE);
        const { totalRenewalFee } = response;
        console.log(`getTotalRenewalFee`, { response });
        dispatch({ type: actionTypes.GET_TOTAL_FEE, payload: totalRenewalFee });
        callback(totalRenewalFee);
    });
};

// GET TOTAL RENEWAL GALLON
export const getTotalRenewalGallon = (account, callback) => (dispatch) => {
    console.log(`getTotalRenewalGallon`, { account });
    ipcRenderer.send(channels.GET_TOTAL_RENEW_GALLON, { account });
    ipcRenderer.on(channels.GET_TOTAL_RENEW_GALLON, (event, response) => {
        ipcRenderer.removeAllListeners(channels.GET_TOTAL_RENEW_GALLON);
        const { totalRenewalGallon } = response;
        console.log(`getTotalRenewalGallon`, { response });
        dispatch({
            type: actionTypes.GET_TOTAL_RENEW_GALLON,
            payload: totalRenewalGallon,
        });
        callback(totalRenewalGallon);
    });
};

// GET TOTAL BUY GALLON
export const getTotalBuyGallon = (account, callback) => (dispatch) => {
    console.log(`getTotalBuyGallon`, { account });
    ipcRenderer.send(channels.GET_TOTAL_BUY_GALLON, { account });
    ipcRenderer.on(channels.GET_TOTAL_BUY_GALLON, (event, response) => {
        ipcRenderer.removeAllListeners(channels.GET_TOTAL_BUY_GALLON);
        const { totalBuyGallon } = response;
        console.log(`getTotalBuyGallon`, { response });
        dispatch({
            type: actionTypes.GET_TOTAL_BUY_GALLON,
            payload: totalBuyGallon,
        });
        callback(totalBuyGallon);
    });
};
