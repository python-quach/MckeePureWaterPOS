import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { authReducer } from './reducers';

const rootReducer = combineReducers({
    form: formReducer,
    auth: authReducer,
});

const store = createStore(rootReducer);

export default store;
