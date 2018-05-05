// React Imports
import React, { Component } from 'react';
import gql from 'graphql-tag';
// import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { getOrders, postOrder } from '../../ducks/reducer';

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
    componentDidMount() {
        this.props.getOrders(localStorage.getObject('auth-token').id);
    }

    render() {
        return (
            <div>
                <h1>Orders</h1>
                <h3>Current Order:</h3>
                <ul>
                    {localStorage.getObject('|||||') ? localStorage.getObject('|||||').map(x => <li>{x.name} - num: {x.count}</li>) : false}
                </ul>
                <label>Past Orders:</label>
                {this.props.getOrdersBool ? (
                    <h1>Loading...</h1>
                ) : (
                    <ul>
                        {this.props.getOrdersList.map(x => <li>
                            <label>{x.order_id}</label>
                            <ul>
                                <li>{x.product.map(y => <li>{y.name}</li>)}</li>
                            </ul>
                        </li>)}
                    </ul>
                )}
                <button onClick={() => {
                    const 
                        order_id = this.props.getOrdersList[this.props.getOrdersList.length-1].order_id + 1,
                        employee_id = localStorage.getObject('auth-token').id;
                    
                    localStorage.getObject('|||||').map(x => this.props.postOrder(order_id, x.id, employee_id, false, x.count));
                    localStorage.removeItem('|||||');
                }}>Place Order!</button>
            </div>
        )
    }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, { getOrders, postOrder })(OrdersPage);