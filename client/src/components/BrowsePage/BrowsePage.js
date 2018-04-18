// React Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getProducts } from '../../ducks/reducer';

class BrowsePage extends Component {
    componentDidMount() {
        this.props.getProducts();
    }
    
    render() {
        return this.props.productsBool ? (
            <h1>Loading...</h1>
        ) : (
            <div>
                <h1>Browse</h1>
                <ul>
                    {this.props.productsList.map((x, y) => <Link to={`/product/${x.id}`} key={y}><li>{x.name}</li></Link>)}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, { getProducts })(BrowsePage);