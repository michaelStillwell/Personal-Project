// React Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Loading } from '../../../imports';
import { 
    getFieldOrders, getNewOrderProducts, removeFromNewOrder, removeAllFromNewOrder, placeOrder
} from '../../../ducks/reducer_order';

class FieldOrders extends Component {
    componentWillMount() {
        this.props.getNewOrderProducts(this.props.login.user);
        this.props.getFieldOrders(this.props.login.user);
    }

    sendPlaceOrder(order) {
        this.props.order.currentOrder.map((x,y) => {
            console.log('CON',x);
            return this.props.placeOrder(order, {product: x.product_id, emp_id: this.props.login.user});
        })
    }

    render() {
        let order;
        if ( this.props.order.orders.length ) {
            order = this.props.order.orders.sort()[this.props.order.orders.length-1].order_id + 1;
        } else {
            order = 1;
        }
        return (
            <div>
                {!this.props.order.newProductsLoading && !this.props.order.ordersLoading ? (
                    <div className='order-container'>
                        <h1>Field Orders Page</h1>
                        {this.props.order.currentOrder.map((x,y) => {
                            let send = {user: this.props.login.user, id: x.id};
                            return (
                                <div key={y}>
                                    <h4>{x.name}</h4>
                                    <a onClick={() => {
                                        window.location.reload();
                                        this.props.removeFromNewOrder(send);
                                    }}>Remove {x.id}</a>
                                </div>
                            )
                        })}
                        {              
                            this.props.order.currentOrder.length ? (
                                <div>
                                    <button onClick={() => {
                                        window.location.reload();
                                        this.props.removeAllFromNewOrder(this.props.login.user);
                                    }}>Remove All</button>
                                    <button onClick={() => {
                                        window.location.reload();
                                        this.sendPlaceOrder(order);
                                    }}>Place Order</button>
                                </div>
                            ) : <button>Create New Order</button>
                        }
                        {
                            this.props.order.orders.length ? (
                                <div>
                                    <h2>Pending Orders:</h2>
                                    {this.props.order.orders.map((x, y) => {
                                        return (
                                            <div key={y}>
                                                <Link to={`/order/${x.username}/${x.order_id}`}>
                                                    Order {x.order_id}
                                                </Link>
                                            </div>
                                        )
                                    })}
                                </div>
                            ) : (
                                <div>
                                    <h2>No Orders Pending</h2>
                                </div>
                            )
                        }

                    </div>)
                : <Loading />}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        login: state.reducer_login,
        order: state.reducer_order
    };
}

export default connect(mapStateToProps, { 
    getFieldOrders, getNewOrderProducts, removeFromNewOrder, removeAllFromNewOrder, placeOrder
})(FieldOrders);