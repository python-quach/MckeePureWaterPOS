import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunkMiddleware from 'redux-thunk';

import { authReducer, membershipReducer, accountReducer } from './reducers';

const middlewareEnhancer = applyMiddleware(thunkMiddleware);
const composedEnhancers = compose(middlewareEnhancer);

const rootReducer = combineReducers({
    form: formReducer,
    auth: authReducer,
    membership: membershipReducer,
    account: accountReducer,
});

// const store = createStore(rootReducer);
const store = createStore(rootReducer, undefined, composedEnhancers);

export default store;
