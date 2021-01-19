import React, { useEffect, useState } from 'react';
import { Header, Icon, Divider } from 'semantic-ui-react';
// import LoginDebug from './LoginDebug';
import LoginForm from './LoginForm';
import LoginGrid from '../Grid/Grid';
import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

function Login(props) {
    const {
        submitSucceeded,
        username,
        password,
        clearFormUser,
        history,
        login,
        focusInput,
        handleSubmit,
        closeApp,
        showBackUpDialog,
    } = props;

    const [errorMessage, setErrorMessage] = useState('');
    const [iconColor, setIconColor] = useState('blueIcon');

    const clearInvalidLoginButton = () => {
        if (errorMessage) {
            setErrorMessage('');
        }
    };

    useEffect(() => {
        errorMessage ? setIconColor('whiteIcon') : setIconColor('blueIcon');
    }, [errorMessage]);

    useEffect(() => {
        const showInvalidButton = (error) => {
            setErrorMessage(error);
            clearFormUser();
        };

        const redirectUserToFindPage = (data) => {
            history.push('/find');
        };

        if (submitSucceeded) {
            login(username, password, (error, data) => {
                error ? showInvalidButton(error) : redirectUserToFindPage(data);
            });
        }
    }, [login, submitSucceeded, password, username, clearFormUser, history]);

    return (
        <LoginGrid>
            <Header as='h1' inverted size='huge' textAlign='left'>
                <Icon name='braille' color='blue' />
                <Header.Content>
                    Mckee Pure Water
                    <Header.Subheader>Version 1.0</Header.Subheader>
                </Header.Content>
            </Header>
            <Divider />
            <Divider hidden />
            <LoginForm
                size='large'
                handleSubmit={handleSubmit(() => {})}
                iconColor={iconColor}
                clearInvalidLoginButton={clearInvalidLoginButton}
                errorMessage={errorMessage}
                username={username}
                password={password}
                focusInput={focusInput}
                submitSucceeded={submitSucceeded}
                closeApp={closeApp}
                backup={showBackUpDialog}
            />
            {/* <LoginDebug
                username={username}
                password={password}
                errorMessage={errorMessage}
                submitSucceeded={submitSucceeded}
            /> */}
        </LoginGrid>
    );
}

Login.defaultProps = {
    gridProps: {
        textAlign: 'center',
        style: { height: '100vh' },
        verticalAlign: 'middle',
    },
};

const mapStateToProps = (state) => {
    const selectFormData = formValueSelector('user');
    return {
        username: selectFormData(state, 'username') || '',
        password: selectFormData(state, 'password') || '',
        submitSucceeded: selectFormData(state, 'submitSucceeded'),
    };
};

const ReduxLoginForm = reduxForm({ form: 'user' })(Login);
export default connect(mapStateToProps, actions)(ReduxLoginForm);
