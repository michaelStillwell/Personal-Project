// React Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { 
    getProducts, postProduct, deleteProduct
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
            delete: false,
            selected: null
        };
    }

    componentDidMount() {
        this.props.getProducts();
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
                            {/* <li><Link to={`/product/${x.id}`} key={y}>{x.name}</Link></li> */}
                            <li key={y}>{x.name}</li>
                            {this.state.selected === y ? (
                                <div className="browse-modal">
                                    hi
                                </div>
                            ) : false

                            }
                            {this.state.delete && this.state.selected === y ? (
                                <div>
                                    <h5>Are you sure you want to delete {x.name}?</h5>
                                    <button onClick={() => this.props.deleteProduct(x.id).then(() => this.setState({delete: false, selected: null}))}>Yes</button>
                                    <button onClick={() => this.setState({delete: false, selected: null})}>No</button>
                                </div>
                            ) : (
                                <button onClick={() => this.setState({delete: true, selected: y})}>delete</button>
                            )}
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
                            <button onClick={() => this.props.postProduct({name: this.state.name, description: this.state.description, price: this.state.price, stock: this.state.stock})}>submit</button>
                            <button onClick={() => this.setState({create: false, name: '', description: '', price: null, stock: null})}>cancel</button>
                        </div>
                    ) : (
                        <button onClick={() => this.setState({create: true})}>Create Product</button>
                    )
                ) : false}
            </div>
        )
    }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, { getProducts, postProduct, deleteProduct })(BrowsePage);