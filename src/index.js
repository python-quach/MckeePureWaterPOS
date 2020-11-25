import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './react/App';
import store from './store';

import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,

    document.getElementById('root')
);
