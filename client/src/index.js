// React Imports
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { AUTH_TOKEN } from './constants';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-client-preset'

import App from './components/App';
import store from './store';

Storage.prototype.setObject = function(key, value) {
    console.log(JSON.stringify(value));
    this.setItem(key, JSON.stringify(value));
};

Storage.prototype.getObject = function(key) {
    const value = this.getItem(key);
    return value && JSON.parse(value);
};

const httpLink = new HttpLink({ uri: 'http://localhost:3223', credentials: 'same-origin' });

const middlewareAuthLink = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem(AUTH_TOKEN);
    const authorizationHeader = token ? `Bearer ${token}` : null;
    operation.setContext({
        headers: {
            authorization: authorizationHeader
        }
    });
    return forward(operation);
});

const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink);

const client = new ApolloClient({
    link: httpLinkWithAuthToken,
    cache: new InMemoryCache()
});
export default client;

ReactDOM.render(
    <Provider store={store}>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ApolloProvider>
    </Provider>,
    document.getElementById('root')
);