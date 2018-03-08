// React Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProductsByOrder, markAsComplete } from '../../ducks/reducer';
import { Link, Loading } from '../../imports';

class DisplayWarehouseOrder extends  Component {
    componentWillMount() {
        let send = { username: this.props.match.params.username, id: this.props.match.params.id };
        this.props.getProductsByOrder(send);
    }

    render() {
        let send = { username: this.props.match.params.username, id: this.props.match.params.id };
        return (
            <div>
                {!this.props.currentOrderLoading ? (
                    <div>
                        <h1>Warehouse Order Page</h1>
                        <h2>Products: </h2>
                        {this.props.currentOrder.map((x,y) => {
                            return (
                                <div key={y}>
                                    <h3>{x.name}</h3>
                                </div>
                            )
                        })}
                        <Link to='/orders'>
                            <button onClick={() => this.props.markAsComplete(send)}>Mark as complete</button>
                        </Link>
                    </div>
                ) : <Loading />}
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getProductsByOrder, markAsComplete })(DisplayWarehouseOrder);