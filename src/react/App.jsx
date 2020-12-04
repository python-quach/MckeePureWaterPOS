import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Find from './components/Find/Find';
import Login from './components/Login/Login';
import Member from './components/Portal/MembershipPortal';
import BuyPortal from './components/Portal/BuyPortal';
import './App.css';
import './BuyForm.css';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Login} />
                <Route exact path='/find' component={Find} />
                <Route exact path='/member' component={Member} />
                <Route exact path='/buy' component={BuyPortal} />
            </Switch>
        </Router>
    );
};

export default App;
