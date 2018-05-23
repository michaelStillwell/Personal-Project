// React Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { 
    getProducts, postProduct, putProduct, deleteProduct
} from '../../ducks/reducer';

import '../../Assets/css/BrowsePage.min.css';

class BrowsePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            price: null,
            stock: null,
            create: false,
            edit: false,
            delete: false,
            selected: null,
            selectedHeight: '0'
        };
    }

    componentDidMount() {
        this.props.getProducts();
    }

    toggleModal(val) {
        this.state.selectedHeight === 'hidden' ? this.setState({ selected: val, selectedHeight: 'block'}) : this.setState({ selected: val, selectedHeight: 'hidden' });
    }
    
    render() {
        return this.props.getProductsBool ? (
            <h1>Loading...</h1>
        ) : (
            <div className="browse-page">
                <h1>Browse</h1>
                <ul>
                    {this.props.getProductsList.map((x, y) => (
                        <div>
                                <li key={y} onClick={() => {
                                    this.toggleModal(y);
                                    this.state.selected === y ? this.setState({ selected: null, edit: false, delete: false, create: false }) : this.setState({ edit: false, delete: false, create: false });
                                }}>{x.name}</li>
                                    <div className="browse-modal" style={{ height: this.state.selected === y ? '200px' : '0', width: this.state.selected === y ? '100%' : '0' }}>
                                        {this.state.selected === y ? (
                                            <div>
                                                <p>{x.description}</p>
                                                <p>{x.price}</p>
                                                <p>{x.stock}</p>
                                                {this.state.edit ? (
                                                    <div>
                                                        <input type="text" onChange={e => this.setState({ name: e.target.value })} placeholder="Name" defaultValue={x.name}/>
                                                        <input type="text" onChange={e => this.setState({ description: e.target.value })} placeholder="Description" defaultValue={x.description}/>
                                                        <input type="text" onChange={e => this.setState({ price: e.target.value })} placeholder="Price" defaultValue={x.price}/>
                                                        <input type="text" onChange={e => this.setState({ stock: e.target.value })} placeholder="Stock" defaultValue={x.stock}/>
                                                        <button onClick={() => this.props.putProduct(x.id, { 
                                                            name: this.state.name || x.name, 
                                                            description: this.state.description || x.description, 
                                                            price: this.state.price || x.price, 
                                                            stock: this.state.stock || x.stock 
                                                        }).then(() => this.setState({ edit: false }))}>Submit</button>
                                                        <button onClick={() => this.setState({ edit: false })}>Cancel</button>
                                                    </div>
                                                ) : (
                                                    <button onClick={() => this.setState({ edit: true, delete: false, create: false })}>Edit Product</button>
                                                )}
                                                {this.state.delete ? (
                                                    <div>
                                                        <h5>Are you sure you want to delete {x.name}?</h5>
                                                        <button onClick={() => this.props.deleteProduct(x.id).then(() => this.setState({ delete: false }))}>Yes</button>
                                                        <button onClick={() => this.setState({ delete: false })}>No</button>
                                                    </div>
                                                ) : (
                                                    <button onClick={() => this.setState({ delete: true })}>delete</button>
                                                )}
                                            </div>
                                        ) : false}
                                    </div>
                        </div>
                    ))}
                </ul>
                {localStorage.getObject('auth-token').emp_type === 'Owner' || localStorage.getObject('auth-token').emp_type === 'Warehouse' ? (
                    this.state.create ? (
                        <div>
                            <input type="text" onChange={e => this.setState({ name: e.target.value})} placeholder="Product Name" />
                            <input type="text" onChange={e => this.setState({ description: e.target.value})} placeholder="Description" />
                            <input type="number" onChange={e => this.setState({ price: e.target.value})} placeholder="Price" />
                            <input type="number" onChange={e => this.setState({ stock: e.target.value})} placeholder="Stock" />
                            <button onClick={() => this.props.postProduct({name: this.state.name, description: this.state.description, price: this.state.price, stock: this.state.stock}).then(() => this.setState({ create: false, name: '', description: '', price: null, stock: null}))}>submit</button>
                            <button onClick={() => this.setState({create: false, name: '', description: '', price: null, stock: null})}>cancel</button>
                        </div>
                    ) : (
                        <button onClick={() => {
                            this.setState({ create: true, edit: false, delete: false });
                            this.toggleModal(null);
                        }}>Create Product</button>
                    )
                ) : false}
            </div>
        )
    }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, { getProducts, postProduct, putProduct, deleteProduct })(BrowsePage);