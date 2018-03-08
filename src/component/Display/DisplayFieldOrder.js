// React Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProductsByOrder } from '../../ducks/reducer';
import { Link } from '../../imports';

class DisplayOrder extends Component {
    componentDidMount() {
        let send = { username: this.props.match.params.username, id: this.props.match.params.id };
        this.props.getProductsByOrder(send);
    }

    render() {
        return (
            <div>
                <h1>Display Order</h1>
                {!this.props.currentOrderLoading ? this.props.currentOrder.map((x,y) => {
                    return (
                        <div key={y}>
                            <Link to={`/product/${x.product}`}>
                                <h1>{x.name}</h1>
                            </Link>
                        </div>
                    )
                }) : <h1>Loading...</h1>}
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getProductsByOrder })(DisplayOrder);