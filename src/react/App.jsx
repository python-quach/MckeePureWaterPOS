import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import FindForm from './components/FindForm';
import Find from './components/Find/Find';
import Dashboard from './components/Dashboard';
import Login from './components/Login/Login';
// import Member from './components/Membership/Membership';
import Member from './components/Portal/MembershipPortal';
import BuyPortal from './components/Portal/BuyPortal';
import './App.css';
import './BuyForm.css';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Login} />
                {/* <Route exact path='/find' component={FindForm} /> */}
                <Route exact path='/find' component={Find} />
                {/* <Route exact path='/member' component={Member} /> */}
                <Route exact path='/portal' component={Member} />
                <Route exact path='/buy' component={BuyPortal} />

                <Route exact path='/dashboard' component={Dashboard} />
            </Switch>
        </Router>
    );
};

export default App;
