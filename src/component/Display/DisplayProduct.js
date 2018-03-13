// React Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    getCurrentProduct, 
    postNewOrder,
    toggleCurrentProductEdit,
    editCurrentProduct,
    updateCurrentProduct,
    deleteCurrentProduct
} from '../../ducks/reducer';
import { Loading, Link } from '../../imports';

class DisplayProduct extends Component {
    componentWillMount() {
        this.props.getCurrentProduct(this.props.match.params.id);
    }

    conditionalRender() {
        let send = {
                        name: this.props.currentProductEditName,
                        description: this.props.currentProductEditDescription,
                        price: this.props.currentProductEditPrice,
                        stock: this.props.currentProductEditStock
                    };
        let win = window.innerWidth > 1024;
        switch(this.props.emp_type) {
            case 'Owner':
                return (
                    win ? (
                        <div className='display-product-owner'>
                            <h2 className='title'>{this.props.currentProduct.name}</h2>
                            <p>{this.props.currentProduct.description}</p>
                            <p className='price'>${this.props.currentProduct.price}</p>
                            <p>Instock: {this.props.currentProduct.stock}</p>
                        </div>
                    ) : (
                        <div className='display-product-owner-mobile'>
                            <h2 className='title'>{this.props.currentProduct.name}</h2>
                            <p>{this.props.currentProduct.description}</p>
                            <p className='price'>${this.props.currentProduct.price}</p>
                            <p className='stock'>Instock: {this.props.currentProduct.stock}</p>
                        </div>
                    )
                )

            case 'Warehouse':
                return (
                    win ? (
                        <div>
                            {!this.props.currentProductEdit ? (
                                <div className='display-product-warehouse'>
                                    <h2>{this.props.currentProduct.name}</h2>
                                    <p>{this.props.currentProduct.description}</p>
                                    <p className='price'>${this.props.currentProduct.price}</p>
                                    <p>Instock: {this.props.currentProduct.stock}</p>
                                    <button 
                                        onClick={() => this.props.toggleCurrentProductEdit(this.props.currentProductEdit)}
                                        >Edit Product
                                    </button>
                                </div>
                            ) : (
                                <div className='display-product-warehouse'>
                                    <h2>Edit!</h2>
                                    <input 
                                        type="text" 
                                        placeholder='Title' 
                                        onChange={e => this.props.editCurrentProduct('NAME', e.target.value)}
                                        defaultValue={this.props.currentProduct.name}
                                    />
                                    <textarea 
                                        type="text" 
                                        placeholder='Description' 
                                        onChange={e => this.props.editCurrentProduct('DESCRIPTION', e.target.value)}
                                        defaultValue={this.props.currentProduct.description}
                                    ></textarea>
                                    <input 
                                        type="number" 
                                        placeholder='Price' 
                                        onChange={e => this.props.editCurrentProduct('PRICE', e.target.value)}
                                        defaultValue={this.props.currentProduct.price}
                                    />
                                    <input 
                                        type="number" 
                                        placeholder='Stock' 
                                        onChange={e => this.props.editCurrentProduct('STOCK', e.target.value)}
                                        defaultValue={this.props.currentProduct.stock}
                                    />
                                    <button
                                        onClick={() => {
                                            this.props.toggleCurrentProductEdit(this.props.currentProductEdit);
                                            this.props.updateCurrentProduct(this.props.match.params.id, send);
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
                    ) : (
                        <div className='display-product-warehouse-mobile'>
                            {!this.props.currentProductEdit ? (
                                <div>
                                    <h2 className='title'>{this.props.currentProduct.name}</h2>
                                    <p>{this.props.currentProduct.description}</p>
                                    <p className='price'>${this.props.currentProduct.price}</p>
                                    <p className='stock'>{this.props.currentProduct.stock}</p>
                                    <button
                                        className='mobile-button'
                                        onClick={() => this.props.toggleCurrentProductEdit(this.props.currentProductEdit)}                                    
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
                                        defaultValue={this.props.currentProduct.name}
                                    />
                                    <textarea 
                                        type="text" 
                                        placeholder='Description'
                                        col='40'
                                        rows='3'
                                        onChange={e => this.props.editCurrentProduct('DESCRIPTION', e.target.value)}
                                        defaultValue={this.props.currentProduct.description}
                                    ></textarea>
                                    <input 
                                        type="number" 
                                        placeholder='Price' 
                                        onChange={e => this.props.editCurrentProduct('PRICE', e.target.value)}
                                        defaultValue={this.props.currentProduct.price}
                                    />
                                    <input 
                                        type="number" 
                                        placeholder='Stock' 
                                        onChange={e => this.props.editCurrentProduct('STOCK', e.target.value)}
                                        defaultValue={this.props.currentProduct.stock}
                                    />
                                    <button
                                        onClick={() => {
                                            this.props.toggleCurrentProductEdit(this.props.currentProductEdit);
                                            this.props.updateCurrentProduct(this.props.match.params.id, send);
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
                        <div>
                            <h2 className='title'>{this.props.currentProduct.name}</h2>
                            <p>{this.props.currentProduct.description}</p>
                            <p className='price'>${this.props.currentProduct.price}</p>
                            <p>Left Instock: {this.props.currentProduct.stock}</p> 
                        </div>
                        <button 
                            onClick={() => this.props.postNewOrder(this.props.user, this.props.currentProduct.id)}
                            >Add to Order
                        </button>
                    </div>
                )

            default:
                return;
        }
    }

    render() {
        return (
            <div>
                {!this.props.currentProductLoading ? (
                    this.conditionalRender()
                ) : <Loading />}
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { 
                                            getCurrentProduct, postNewOrder, toggleCurrentProductEdit, 
                                            editCurrentProduct, updateCurrentProduct, deleteCurrentProduct
                                        })(DisplayProduct);