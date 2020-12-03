import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { authReducer, membershipReducer } from './reducers';

const rootReducer = combineReducers({
    form: formReducer,
    auth: authReducer,
    membership: membershipReducer,
});

const store = createStore(rootReducer);

export default store;
