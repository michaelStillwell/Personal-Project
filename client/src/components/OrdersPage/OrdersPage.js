// React Imports
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getOrders, postOrder } from '../../ducks/reducer';

class OrdersPage extends Component {
    componentDidMount() {
        this.props.getOrders(localStorage.getObject('auth-token').id);
    }

    render() {
        return (
            <div>
                <h1>Orders</h1>
                {localStorage.getObject('|||||') ? (
                    <div>
                        <h3>Current Order:</h3>
                        <ul>
                            {localStorage.getObject('|||||') ? localStorage.getObject('|||||').map(x => <li>{x.name} - num: {x.count}</li>) : false}
                        </ul>
                    </div>
                ) : false}
                {this.props.getOrdersBool ? (
                    <h1>Loading...</h1>
                ) : (
                    <div>
                        {/* TODO: Find a way to do this without repeating */}
                        <label>Incomplete Orders:</label>
                        <ul>
                            {this.props.getOrdersList.filter(e => e.completion === false).map(x => (
                                <li>
                                    <label>{x.order_id}</label>
                                    <ul>
                                        {x.product.map(y => <li>{y.name}</li>)}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                        <label>Completed Orders:</label>
                        <ul>
                            {this.props.getOrdersList.filter(e => e.completion === true).map(x => (
                                <li>
                                    <label>{x.order_id}</label>
                                    <ul>
                                        {x.product.map(y => <li>{y.name}</li>)}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {localStorage.getObject('|||||') ? (
                    <button onClick={() => {
                        const 
                            order_id = this.props.getOrdersList.length ? this.props.getOrdersList[this.props.getOrdersList.length-1].order_id + 1 : 1 ,
                            employee_id = localStorage.getObject('auth-token').id;

                        localStorage.getObject('|||||').map(x => this.props.postOrder(order_id, x.id, employee_id, false, x.count));
                        localStorage.removeItem('|||||');
                    }}>Place Order!</button>
                ) : false}
            </div>
        )
    }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, { getOrders, postOrder })(OrdersPage);