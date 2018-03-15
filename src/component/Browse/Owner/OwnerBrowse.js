// React Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateSearch } from '../../../ducks/reducer_product';
import { Loading, Link } from '../../../imports';

class FieldBrowse extends Component {
    render() {
        let win = window.innerWidth > 1024;
        return (
            win ? (
                !this.props.productsLoading ? (
                    <div className='browse-container'>
                        <h1>Owner's Browse Page</h1>
                        <input type='text' placeholder='Search Products' onChange={e => this.props.updateSearch(e.target.value)} />
                        {this.props.products.filter(z => {
                            return z.name.toLowerCase().includes(this.props.searchInput.toLowerCase());
                        }).map((x,y) => {
                            return (
                                <div key={y} className='browse-desktop'>
                                    <Link to={`/product/display/${x.id}`}>
                                        {x.name}
                                    </Link>
                                    {x.description.length < 30 ? (
                                        <p>{x.description}</p>
                                    ) : (
                                        <p>{x.description.slice(0, 30)+'...'}</p>
                                    )
                                    }
                                    <p className='price'>${x.price.toFixed(2)}</p>
                                    <p>Instock: {x.stock}</p>
                                </div>
                            )
                        })}
                    </div>
                ) : <Loading />
            ) : (
                !this.props.productsLoading ? (
                    <div className='browse-mobile'>
                        <h1>Browse</h1>
                        <input type='text' placeholder='Search...'/>
                        {this.props.products.filter(z => {
                            return z.name.toLowerCase().includes(this.props.searchInput.toLowerCase());
                        }).map((x,y) => {
                            return (
                                <div key={y} className='product-mobile'>
                                    <Link to={`product/display/${x.id}`}>
                                        {x.name}
                                    </Link>
                                    <p>${x.price.toFixed(2)}</p>
                                </div>
                            )
                        })}
                    </div>
                ) : <Loading />
            )
        )
    }
}

const mapStateToProps = state => state.reducer_product;

export default connect(mapStateToProps, { updateSearch })(FieldBrowse);