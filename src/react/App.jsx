import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Find from './components/Find/Find';
import Member from './components/Portal/MembershipPortal';
import BuyScreen from './components/Buy/BuyScreen';
import AddScreen from './components/Add/AddScreen';
import './App.css';
import './BuyForm.css';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Login} />
                <Route exact path='/find' component={Find} />
                <Route exact path='/member' component={Member} />
                <Route exact path='/account' component={BuyScreen} />
                <Route exact path='/add' component={AddScreen} />
            </Switch>
        </Router>
    );
};

export default App;
