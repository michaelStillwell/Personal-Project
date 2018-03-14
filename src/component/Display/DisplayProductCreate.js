// React Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { productsCreate, createProduct } from '../../ducks/reducer';
import { Link } from '../../imports';

class DisplayProductCreate extends Component {
    render() {
        let send = {name: this.props.productsCreateName, description: this.props.productsCreateDescription, price: this.props.productsCreatePrice, stock: this.props.productsCreateStock};
        // let win = window.innerWidth > 1024;
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
                        this.props.createProduct(send);
                        {/* window.location.reload(); */}
                    }}>Submit New Product</button>
                </Link>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { productsCreate, createProduct })(DisplayProductCreate);