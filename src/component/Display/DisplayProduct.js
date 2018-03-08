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
import { Link } from '../../imports';

class DisplayProduct extends Component {
    componentDidMount() {
        this.props.getCurrentProduct(this.props.match.params.id);
    }

    conditionalRender() {
        let send = {
                        name: this.props.currentProductEditName,
                        description: this.props.currentProductEditDescription,
                        price: this.props.currentProductEditPrice,
                        stock: this.props.currentProductEditStock
                    };
        switch(this.props.emp_type) {
            case 'Owner':
                return (
                    <div>
                        <h1>Owner</h1>
                        <div>
                            <h2>{this.props.currentProduct.name}</h2>
                            <p>{this.props.currentProduct.description}</p>
                            <p>{this.props.currentProduct.price}</p>
                            <p>{this.props.currentProduct.stock}</p>
                        </div>
                    </div>
                )

            case 'Warehouse':
                return (
                    <div>
                        {!this.props.currentProductEdit ? (
                            <div>
                                <h2>{this.props.currentProduct.name}</h2>
                                <p>{this.props.currentProduct.description}</p>
                                <p>{this.props.currentProduct.price}</p>
                                <p>{this.props.currentProduct.stock}</p>
                                <button 
                                    onClick={() => this.props.toggleCurrentProductEdit(this.props.currentProductEdit)}
                                    >Edit Product
                                </button>
                            </div>
                        ) : (
                            <div>
                                <h1>Edit!</h1>
                                <input 
                                    type="text" 
                                    placeholder='Title' 
                                    onChange={e => this.props.editCurrentProduct('NAME', e.target.value)}
                                    defaultValue={this.props.currentProduct.name}
                                />
                                <input 
                                    type="text" 
                                    placeholder='Description' 
                                    onChange={e => this.props.editCurrentProduct('DESCRIPTION', e.target.value)}
                                    defaultValue={this.props.currentProduct.description}
                                />
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

            case 'Field':
                return (
                    <div>
                        <div>
                            <h2>{this.props.currentProduct.name}</h2>
                            <p>{this.props.currentProduct.description}</p>
                            <p>{this.props.currentProduct.price}</p>
                            <p>{this.props.currentProduct.stock}</p> 
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
                <h1>Product</h1>
                {!this.props.currentProductLoading ? (
                    this.conditionalRender()
                ) : <h1>Loading...</h1>}
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { 
                                            getCurrentProduct, postNewOrder, toggleCurrentProductEdit, 
                                            editCurrentProduct, updateCurrentProduct, deleteCurrentProduct
                                        })(DisplayProduct);