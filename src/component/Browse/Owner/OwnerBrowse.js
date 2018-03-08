// React Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateSearch } from '../../../ducks/reducer';
import {Loading, Link } from '../../../imports';

class FieldBrowse extends Component {
    render() {
        return (
            !this.props.productsLoading ? (
                <div className='browse-container'>
                    <h1>Owner's Browse Page</h1>
                    <input type='text' placeholder='Search Products' onChange={e => this.props.updateSearch(e.target.value)} />
                    {this.props.products.filter(z => {
                        return z.name.toLowerCase().includes(this.props.searchInput.toLowerCase());
                    }).map((x,y) => {
                        return (
                            <div key={y}>
                                <Link to={`/product/display/${x.id}`}>
                                    <button>{x.name}</button>
                                </Link>
                                <p>{x.description}</p>
                                <p>{x.price}</p>
                                <p>{x.stock}</p>
                            </div>
                        )
                    })}
                </div>
            ) : <Loading />
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { updateSearch })(FieldBrowse);