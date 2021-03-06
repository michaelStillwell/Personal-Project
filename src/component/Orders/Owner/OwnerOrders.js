// React Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getWarehouseOrders } from '../../../ducks/reducer_order';
import { Link, Loading } from '../../../imports';

class WarehouseOrders extends Component {
    componentDidMount() {
        this.props.getWarehouseOrders();
    }

    render() {
        let win = window.innerWidth > 1024;
        return (
            <div className='order-container'>
                {win ? (
                    !this.props.ordersLoading ? (
                        <div>
                            { this.props.orders.length ? (
                                <div>
                                    <h1>Owner's Orders Page</h1>
                                    {this.props.orders.map((x,y) => {
                                        return (
                                            <div key={y} className='order-link'>
                                                <Link to={`/order/warehouse/${x.username}/${x.order_id}`}>
                                                    {`${x.username} ${x.order_id}`}
                                                </Link>
                                            </div>
                                        )
                                    })}
                                </div>
                            ) : <h1>No Pending Orders for the Owner to look at!</h1>
                            }
                        </div>
                    ) : <Loading />
                ) : (
                    !this.props.ordersLoading ? (
                        <div className='order-mobile'>
                            {this.props.orders.length ? (
                                <div>
                                    <h1>Orders</h1>
                                    {this.props.orders.map((x,y) => {
                                        return (
                                            <div key={y}>
                                                <Link to={`/order/warehouse/${x.username}/${x.order_id}`}>
                                                    {`${x.username} ${x.order_id}`}
                                                </Link>
                                            </div>
                                        )
                                    })}
                                </div>
                            ) : <h1>No Pending Orders</h1>}
                        </div>
                    ) : <Loading />
                )}
            </div>
        )
    }
}

const mapStateToProps = state => state.reducer_order;

export default connect(mapStateToProps, { getWarehouseOrders })(WarehouseOrders);