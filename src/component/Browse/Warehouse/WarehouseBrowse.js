// React Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createProduct, updateSearch } from '../../../ducks/reducer';
import { Loading, Link } from '../../../imports';

class WarehouseBrowse extends Component {
    render() {
        let win = window.innerWidth > 1024;
        console.log(this.props);
        return (
            win ? (
                <div className='browse-container'>
                    {!this.props.productsLoading && this.props.products.length ? (
                        <div>
                            <h1>Warehouse Browse Page</h1>
                            <div className='search'>
                                <input type='text' placeholder='Search...' onChange={e => this.props.updateSearch(e.target.value)}/>
                                <Link to='/product/create' className='edit-product'>
                                    Enter New Product
                                </Link>
                            </div>
                            {this.props.products.filter(z => {
                                return z.name.toLowerCase().includes(this.props.searchInput.toLowerCase());
                            }).map((x,y) => {
                                return (
                                    <div key={y} className='browse-desktop'>
                                        <Link to={`/product/display/${x.id}`}>
                                            {x.name}
                                        </Link>
                                        <p className='price'>{x.stock} Left Instock</p>
                                    </div>
                                )
                            })}
                        </div>
                    ) : <Loading />}
                </div>
            ) : (
                <div>
                    {!this.props.productsLoading && this.props.products.length ? (
                        <div className='browse-mobile'>
                            <h1>Browse</h1>
                            <input type='text' placeholder='Search...' onChange={e => this.props.updateSearch(e.target.value)}/>
                            <Link to='/product/create' className='edit-product'>
                                Enter New Product
                            </Link>
                            {this.props.products.filter(z => {
                                return z.name.toLowerCase().includes(this.props.searchInput.toLowerCase());
                            }).map((x,y) => {
                                return (
                                    <div key={y} className='product-mobile'>
                                        <Link to={`/product/display/${x.id}`}>
                                            {x.name}
                                        </Link>
                                            <p>{x.stock} Left Instock</p>
                                    </div>
                                )
                            })}
                        </div>
                    ) : <Loading />}
                </div>
            )
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { createProduct, updateSearch })(WarehouseBrowse);