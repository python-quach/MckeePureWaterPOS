import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import FindForm from './components/FindForm';
import Dashboard from './components/Dashboard';
import './App.css';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={LoginForm} />
                <Route exact path='/find' component={FindForm} />
                <Route exact path='/dashboard' component={Dashboard} />
            </Switch>
        </Router>
    );
};

export default App;
