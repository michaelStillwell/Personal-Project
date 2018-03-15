// React Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProductsByOrder, markAsComplete } from '../../ducks/reducer_order';
import { Link, Loading } from '../../imports';

class DisplayWarehouseOrder extends  Component {
    componentWillMount() {
        let send = { username: this.props.match.params.username, id: this.props.match.params.id };
        this.props.getProductsByOrder(send);
    }

    render() {
        let send = { username: this.props.match.params.username, id: this.props.match.params.id };
        let win = window.innerWidth > 1024;
        return (
            <div className='display-order-container'>
                {win ? (
                    !this.props.currentOrderLoading ? (
                        <div>
                            <h1>Warehouse Order Page</h1>
                            <h2>Products: </h2>
                            {this.props.currentOrder.map((x,y) => {
                                return (
                                    <div key={y} className='product-link'>
                                        <Link to={`/product/display/${x.product}`}>
                                            {x.name}
                                        </Link>
                                    </div>
                                )
                            })}
                            <button onClick={() => this.props.markAsComplete(send)}>Mark as complete</button>
                        </div>
                    ) : <Loading />
                ) : (
                    !this.props.currentOrderLoading ? (
                        <div className='display-order-mobile'>
                            <h1>Orders</h1>
                            <h2>Products:</h2>
                            {this.props.currentOrder.map((x,y) => {
                                return (
                                    <div key={y}>
                                        <Link to={`/product/display/${x.product}`}>
                                            {x.name}
                                        </Link>
                                    </div>
                                )
                            })}
                            <button onClick={() => this.props.markAsComplete(send)}>Mark as complete</button>
                        </div>
                    ) : <Loading />
                )}
            </div>
        )
    }
}

const mapStateToProps = state => state.reducer_order;

export default connect(mapStateToProps, { getProductsByOrder, markAsComplete })(DisplayWarehouseOrder);