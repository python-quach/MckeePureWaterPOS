import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import FindForm from './components/FindForm';
import Dashboard from './components/Dashboard';
import Login from './components/Login/Login';
import './App.css';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Login} />
                <Route exact path='/find' component={FindForm} />
                <Route exact path='/dashboard' component={Dashboard} />
            </Switch>
        </Router>
    );
};

export default App;
