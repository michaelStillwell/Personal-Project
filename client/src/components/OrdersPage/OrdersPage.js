// React Imports
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

const CREATE_ORDER = gql`
    mutation($products: [OrderInput]) {
        createOrder(products: $products)
    }
`;

const GET_ALL_ORDERS = gql`
    query($id: ID!) {
        getAllOrders(id: $id) {
            order_id
            product {
                id
                name
                description
                price
                stock
                amount
            }
        }
    }
`;

class OrdersPage extends Component {
    _placeOrder = async () => {
        let send = localStorage.getObject('|||||');
        console.log(this.props)
        let result = await this.props.createOrder({
            variables: {
                products: send
            }
        });
        console.log(result);
    }

    _getOrders = async () => {
        let result = await this.props.getAllOrders({
            variables: {
                id: 2
            }
        });
        return result;
    }

    render() {
        return (
            <div>
                <h1>Orders</h1>
                <h3>Current Order:</h3>
                <ul>
                    {localStorage.getObject('|||||') ? localStorage.getObject('|||||').map(x => <li>{x.name}</li>) : false}
                </ul>
                <ul>
                    {}
                </ul>
                <button onClick={() => {
                    this._placeOrder().catch(err => console.log(err));
                }}>Place Order!</button>
            </div>
        )
    }
}

export default compose(
    graphql(CREATE_ORDER, {name: 'createOrder'}),
    graphql(GET_ALL_ORDERS, {name: 'getAllOrders', options: {id: 2}})
)(OrdersPage);