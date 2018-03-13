// React Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Loading } from '../../../imports';
import { 
    getFieldOrders, getNewOrderProducts, removeFromNewOrder, removeAllFromNewOrder, placeOrder
} from '../../../ducks/reducer';

class FieldOrders extends Component {
    componentWillMount() {
        this.props.getNewOrderProducts(this.props.user);
        this.props.getFieldOrders(this.props.user);
    }

    sendPlaceOrder(order) {
        this.props.currentOrder.map((x,y) => {
            console.log('CON',x);
            return this.props.placeOrder(order, {product: x.product_id, emp_id: this.props.user});
        })
    }

    render() {
        var order;
        if ( this.props.orders.length ) {
            order = this.props.orders.sort()[this.props.orders.length-1].order_id + 1;
        } else {
            order = 1;
        }
        return (
            <div>
                {!this.props.newProductsLoading && !this.props.ordersLoading ? (
                    <div className='order-container'>
                        <h1>Field Orders Page</h1>
                        {this.props.currentOrder.map((x,y) => {
                            let send = {user: this.props.user, id: x.id};
                            return (
                                <div key={y}>
                                    <h4>{x.name}</h4>
                                    <a onClick={() => this.props.removeFromNewOrder(send)}>Remove {x.id}</a>
                                </div>
                            )
                        })}
                        {              
                            this.props.currentOrder.length ? (
                                <div>
                                    <button onClick={() => this.props.removeAllFromNewOrder(this.props.user)}>Remove All</button>
                                    <button onClick={() => this.sendPlaceOrder(order)}>Place Order</button>
                                </div>
                            ) : <button>Create New Order</button>
                        }
                        {
                            this.props.orders.length ? (
                                <div>
                                    <h2>Pending Orders:</h2>
                                    {this.props.orders.map((x, y) => {
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

const mapStateToProps = state => state;

export default connect(mapStateToProps, { 
    getFieldOrders, getNewOrderProducts, removeFromNewOrder, removeAllFromNewOrder, placeOrder
})(FieldOrders);