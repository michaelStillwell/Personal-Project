// React Imports
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

// Component
import App from './component/App';
import store from './store';

import './index.css';

ReactDOM.render(
    <Provider store={store} >
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>,
    document.getElementById('root')
)