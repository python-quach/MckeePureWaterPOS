import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { authReducer, membershipReducer, accountReducer } from './reducers';

const rootReducer = combineReducers({
    form: formReducer,
    auth: authReducer,
    membership: membershipReducer,
    account: accountReducer,
});

const store = createStore(rootReducer);

export default store;
