// React Imports
import React, { Component } from 'react';
import gql from 'graphql-tag';

const PLACE_ORDER = gql`
    mutation() {
        placeOrder() {
            
        }
    }
`;

class OrdersPage extends Component {
    render() {
        return (
            <div>
                <h1>Orders</h1>
                <h3>Current Order:</h3>
                <ul>
                    {localStorage.getObject('|||||').map(x => <li>{x.name}</li>)}
                </ul>
                <button onClick={() => {
                    return
                }}>Place Order!</button>
            </div>
        )
    }
}

export default OrdersPage;