// React Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getWarehouseOrders } from '../../../ducks/reducer';
import { Link, Loading } from '../../../imports';

class WarehouseOrders extends Component {
    componentDidMount() {
        this.props.getWarehouseOrders();
    }

    render() {
        return (
            <div>
                { !this.props.ordersLoading ? (
                    <div>
                        { this.props.orders.length ? (
                            <div>
                                <h1>Warehouse Orders Page</h1>
                                {this.props.orders.map((x,y) => {
                                    return (
                                        <div key={y}>
                                            <Link to={`/order/warehouse/${x.username}/${x.order_id}`}>
                                                <h1>{`${x.username} ${x.order_id}`}</h1>
                                            </Link>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : <h1>No Pending Orders</h1>
                        }
                    </div>
                ) : <Loading />}
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getWarehouseOrders })(WarehouseOrders);