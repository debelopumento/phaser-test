import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Login from './login';

ReactDOM.render(
    <Provider store={store}>
        <Login />
    </Provider>,
    document.getElementById('reactRoot')
);
