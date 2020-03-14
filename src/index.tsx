import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Hook from './Hook';
import Template from './test';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Template />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();