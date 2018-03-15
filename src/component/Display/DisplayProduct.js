// React Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    getCurrentProduct, 
    inputCurrentInfo,
    toggleCurrentProductEdit,
    editCurrentProduct,
    updateCurrentProduct,
    deleteCurrentProduct,
} from '../../ducks/reducer_product';
import {
    postNewOrder,
} from '../../ducks/reducer_order';
import {
    getFeaturedProducts,
    postFeaturedProduct,
    deleteFeaturedProduct
} from '../../ducks/reducer_featured';
import { Loading, Link } from '../../imports';

class DisplayProduct extends Component {
    componentWillMount() {
        this.props.getCurrentProduct(this.props.match.params.id);
        this.props.getFeaturedProducts();
    }

    conditionalRender() {
        let send = {
                        name: this.props.product.currentProductEditName,
                        description: this.props.product.currentProductEditDescription,
                        price: this.props.product.currentProductEditPrice,
                        stock: this.props.product.currentProductEditStock
                    };
        let win = window.innerWidth > 1024;
        switch(this.props.login.emp_type) {
            case 'Owner':
                return (
                    win ? (
                        <div className='display-product-owner'>
                            <h2 className='title'>{this.props.product.currentProduct.name}</h2>
                            <p>{this.props.product.currentProduct.description}</p>
                            <p className='price'>${this.props.product.currentProduct.price}</p>
                            <p>Instock: {this.props.product.currentProduct.stock}</p>
                        </div>
                    ) : (
                        <div className='display-product-owner-mobile'>
                            <h2 className='title'>{this.props.product.currentProduct.name}</h2>
                            <p>{this.props.product.currentProduct.description}</p>
                            <p className='price'>${this.props.product.currentProduct.price}</p>
                            <p className='stock'>Instock: {this.props.product.currentProduct.stock}</p>
                        </div>
                    )
                )

            case 'Warehouse':
                return (
                    win ? (
                        <div>
                            {!this.props.product.currentProductEdit ? (
                                <div className='display-product-warehouse'>
                                    <h2>{this.props.product.currentProduct.name}</h2>
                                    <p>{this.props.product.currentProduct.description}</p>
                                    <p className='price'>${this.props.product.currentProduct.price}</p>
                                    <p>Instock: {this.props.product.currentProduct.stock}</p>
                                    <button 
                                        onClick={() => {
                                            this.props.toggleCurrentProductEdit(this.props.product.currentProductEdit);
                                            this.props.inputCurrentInfo(
                                                this.props.product.currentProduct.name, 
                                                this.props.product.currentProduct.description, 
                                                this.props.product.currentProduct.price,
                                                this.props.product.currentProduct.stock);
                                        }}
                                        >Edit Product
                                    </button>
                                    {this.props.featured.featuredProducts.filter(x => x.id === this.props.product.currentProduct.id).length ? (
                                        <button
                                            onClick={() => {
                                                this.props.deleteFeaturedProduct(this.props.product.currentProduct.id);
                                                window.location.reload();
                                            }}
                                            >Remove from Featured
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                this.props.postFeaturedProduct(this.props.product.currentProduct.id);
                                                window.location.reload();
                                            }}
                                            >Add to Featured
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <div className='display-product-warehouse'>
                                    <h2>Edit!</h2>
                                    <input 
                                        type="text" 
                                        placeholder='Title' 
                                        onChange={e => this.props.editCurrentProduct('NAME', e.target.value)}
                                        defaultValue={this.props.product.currentProduct.name}
                                    />
                                    <textarea 
                                        type="text" 
                                        placeholder='Description' 
                                        onChange={e => this.props.editCurrentProduct('DESCRIPTION', e.target.value)}
                                        defaultValue={this.props.product.currentProduct.description}
                                    ></textarea>
                                    <input 
                                        type="number" 
                                        placeholder='Price' 
                                        onChange={e => this.props.editCurrentProduct('PRICE', e.target.value)}
                                        defaultValue={this.props.product.currentProduct.price}
                                    />
                                    <input 
                                        type="number" 
                                        placeholder='Stock' 
                                        onChange={e => this.props.editCurrentProduct('STOCK', e.target.value)}
                                        defaultValue={this.props.product.currentProduct.stock}
                                    />
                                    <button
                                        onClick={() => {
                                            this.props.toggleCurrentProductEdit(this.props.product.currentProductEdit);
                                            this.props.updateCurrentProduct(this.props.match.params.id, send);
                                            window.location.reload();
                                        }}
                                        >Update Product
                                    </button>
                                    <Link to='/browse'>
                                        <button
                                            onClick={() => {
                                                this.props.deleteCurrentProduct(this.props.match.params.id);
                                                window.location.reload();
                                            }}
                                            >Delete Product
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className='display-product-warehouse-mobile'>
                            {!this.props.product.currentProductEdit ? (
                                <div>
                                    <h2 className='title'>{this.props.product.currentProduct.name}</h2>
                                    <p>{this.props.product.currentProduct.description}</p>
                                    <p className='price'>${this.props.product.currentProduct.price}</p>
                                    <p className='stock'>{this.props.product.currentProduct.stock}</p>
                                    <button
                                        className='mobile-button'
                                        onClick={() => {
                                            this.props.toggleCurrentProductEdit(this.props.product.currentProductEdit);
                                            this.props.inputCurrentInfo(
                                                this.props.product.currentProduct.name, 
                                                this.props.product.currentProduct.description, 
                                                this.props.product.currentProduct.price,
                                                this.props.product.currentProduct.stockf);
                                        }}
                                    >Edit</button>
                                </div>
                            ) : (
                                <div>
                                    <h2>Edit!</h2>
                                    <input 
                                        type="text" 
                                        autoFocus
                                        placeholder='Title' 
                                        onChange={e => this.props.editCurrentProduct('NAME', e.target.value)}
                                        defaultValue={this.props.product.currentProduct.name}
                                    />
                                    <textarea 
                                        type="text" 
                                        placeholder='Description'
                                        col='40'
                                        rows='3'
                                        onChange={e => this.props.editCurrentProduct('DESCRIPTION', e.target.value)}
                                        defaultValue={this.props.product.currentProduct.description}
                                    ></textarea>
                                    <input 
                                        type="number" 
                                        placeholder='Price' 
                                        onChange={e => this.props.editCurrentProduct('PRICE', e.target.value)}
                                        defaultValue={this.props.product.currentProduct.price}
                                    />
                                    <input 
                                        type="number" 
                                        placeholder='Stock' 
                                        onChange={e => this.props.editCurrentProduct('STOCK', e.target.value)}
                                        defaultValue={this.props.product.currentProduct.stock}
                                    />
                                    <button
                                        onClick={() => {
                                            this.props.toggleCurrentProductEdit(this.props.product.currentProductEdit);
                                            this.props.updateCurrentProduct(this.props.match.params.id, send);
                                            window.location.reload();
                                        }}
                                        >Update Product
                                    </button>
                                    <Link to='/browse'>
                                        <button
                                            onClick={() => {
                                                this.props.deleteCurrentProduct(this.props.match.params.id);
                                            }}
                                            >Delete Product
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    )
                )

            case 'Field':
                return (
                    <div className='display-product-owner'>
                        <div className='content'>
                            <h2 className='title'>{this.props.product.currentProduct.name}</h2>
                            <p>{this.props.product.currentProduct.description}</p>
                            <p className='price'>${this.props.product.currentProduct.price}</p>
                            <p>Left Instock: {this.props.product.currentProduct.stock}</p> 
                        </div>
                        <Link to='/browse'>
                            <button 
                                onClick={() => this.props.postNewOrder(this.props.login.user, this.props.product.currentProduct.id)}
                                >Add to Order
                            </button>
                        </Link>
                    </div>
                )

            default:
                return <h1>Failed from Product</h1>;
        }
    }

    render() {
        return (
            <div>
                {!this.props.product.currentProductLoading ? (
                    this.conditionalRender()
                ) : <Loading />}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        login: state.reducer_login,
        product: state.reducer_product,
        featured: state.reducer_featured,
    };
};

export default connect(mapStateToProps, { 
                                            getCurrentProduct, postNewOrder, toggleCurrentProductEdit, 
                                            editCurrentProduct, updateCurrentProduct, deleteCurrentProduct,
                                            inputCurrentInfo, getFeaturedProducts, postFeaturedProduct,
                                            deleteFeaturedProduct
                                        })(DisplayProduct);