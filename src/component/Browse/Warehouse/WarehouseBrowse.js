// React Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createProduct } from '../../../ducks/reducer';
import { Link } from '../../../imports';

class WarehouseBrowse extends Component {
    render() {
        return (
            <div>
                {!this.props.productsLoading && this.props.products.length ? (
                    <div>
                        <h1>Warehouse Browse Page</h1>
                        <Link to='/product/create'>
                            <button>Enter New Product</button>
                        </Link>
                        {this.props.products.map((x,y) => {
                            return (
                                <div key={y}>
                                    <Link to={`/product/display/${x.id}`}>
                                        <h1>{x.name}</h1>
                                    </Link>
                                        <p>{x.stock} Left Instock</p>
                                </div>
                            )
                        })}
                    </div>
                ) : <h1>Loading...</h1>}
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { createProduct })(WarehouseBrowse);