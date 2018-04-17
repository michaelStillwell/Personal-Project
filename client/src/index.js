// React Imports
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import App from './components/App';
import store from './store';

const httpLink = new HttpLink({ uri: 'http://localhost:3223'});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});
export default client;
ReactDOM.render(
    <Provider store={store}>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </Provider>,
    document.getElementById('root')
);