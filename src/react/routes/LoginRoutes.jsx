import React from 'react';
import { Route } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

const LoginRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(routeProps) => <Component {...routeProps} />}
        />
    );
};

export default LoginRoute;
