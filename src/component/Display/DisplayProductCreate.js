// React Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { productsCreate, createProduct } from '../../ducks/reducer_product';
import { Link } from '../../imports';

class DisplayProductCreate extends Component {
    render() {
        let send = {name: this.props.reducer_product.productsCreateName, description: this.props.reducer_product.productsCreateDescription, price: this.props.reducer_product.productsCreatePrice, stock: this.props.reducer_product.productsCreateStock};
        console.log(this.props)
        return (
            <div className='display-product-create'>
                <h2>Create New Product</h2>
                <input 
                    type="text" 
                    autoFocus
                    placeholder='Title' 
                    onChange={e => this.props.productsCreate('NAME', e.target.value)} 
                />
                <textarea 
                    type="text" 
                    placeholder='Description' 
                    onChange={e => this.props.productsCreate('DESCRIPTION', e.target.value)} 
                ></textarea>
                <input 
                    type="number" 
                    placeholder='Price' 
                    onChange={e => this.props.productsCreate('PRICE', e.target.value)} 
                />
                <input 
                    type="number" 
                    placeholder='Stock' 
                    onChange={e => this.props.productsCreate('STOCK', e.target.value)} 
                />
                <Link to='/browse'>
                    <button onClick={() => {
                        window.location.reload();
                        this.props.createProduct(send);
                    }}>Submit New Product</button>
                </Link>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { productsCreate, createProduct })(DisplayProductCreate);