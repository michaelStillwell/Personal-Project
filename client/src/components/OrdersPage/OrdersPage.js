// React Imports
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const CREATE_ORDER = gql`
    mutation($products: [OrderInput]) {
        createOrder(products: $products)
    }
`;

const GET_ALL_ORDERS = gql`
    query($id: ID!) {
        getAllOrders(id: $id) {
            
        }
    }
`;

class OrdersPage extends Component {
    _placeOrder= async () => {
        let send = localStorage.getObject('|||||');



        let result = await this.props.createOrder({
            variables: {
                products: send
            }
        });
        console.log(result);
    }

    render() {
        return (
            <div>
                <h1>Orders</h1>
                <h3>Current Order:</h3>
                <ul>
                    {localStorage.getObject('|||||') ? localStorage.getObject('|||||').map(x => <li>{x.name}</li>) : false}
                </ul>
                <button onClick={() => {
                    this._placeOrder().catch(err => console.log(err));
                }}>Place Order!</button>
            </div>
        )
    }
}

export default graphql(CREATE_ORDER, {name: 'createOrder'})(OrdersPage);