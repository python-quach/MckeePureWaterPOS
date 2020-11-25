import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { channels } from '../shared/constants';
import LoginForm from './components/LoginForm';
import { formValueSelector } from 'redux-form';
import './App.css';
const { ipcRenderer } = window;

const App = (props) => {
    const { user, clearForm, username, password } = props;
    const [, setRows] = useState('');

    useEffect(() => {
        ipcRenderer.send(channels.APP_INFO);
        ipcRenderer.on(channels.APP_INFO, (event, arg) => {
            ipcRenderer.removeAllListeners(channels.APP_INFO);
            const { rows } = arg;
            console.table(rows);
            setRows(rows);
        });
    }, []);

    return (
        <LoginForm
            username={username}
            password={password}
            data={user}
            onSubmit={(values) => {
                console.log('LoginForm was submitted', { values });
                clearForm();
            }}
        />
    );
};

const mapStateToProps = (state) => {
    const selectFormData = formValueSelector('user');
    return {
        username: selectFormData(state, 'username'),
        password: selectFormData(state, 'password'),
        user: state.form.user
            ? {
                  values: state.form.user.values,
                  submitSucceeded: state.form.user.submitSucceeded,
              }
            : {},
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearForm: () => dispatch(reset('user')),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
