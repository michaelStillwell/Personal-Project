// React Imports
import React, { Component } from 'react';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { connect } from 'react-redux';
import { putProduct } from '../../ducks/reducer';

const GET_PRODUCT_BY_ID = gql`
    query($id: ID!) {
        getProduct(id: $id) {
            id
            name
            description
            price
            stock
        }
    }
`;

class ProductPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            price: null,
            stock: null,
            edit: false,
        }
    }

    render() {
        return (
            <Query query={GET_PRODUCT_BY_ID} variables={{ id: Number(this.props.match.params.id)}}>
                {({ loading, error, data }) => {
                    if ( loading ) return <h1>Loading...</h1>;
                    if ( error ) console.log('PRODUCT PAGE ERROR: ', error);
                    const info = data.getProduct[0];

                    return (
                        <div>
                            {this.state.edit ? (
                                <div>
                                    <input type="text" onChange={e => this.setState({name: e.target.value})} placeholder="Product Name" defaultValue={info.name} />
                                    <input type="text" onChange={e => this.setState({description: e.target.value})} placeholder="Description" defaultValue={info.description} />
                                    <input type="number" onChange={e => this.setState({price: e.target.value})} placeholder="Price" defaultValue={info.price} />
                                    <input type="number" onChange={e => this.setState({stock: e.target.value})} placeholder="Stock" defaultValue={info.stock} />
                                    <button onClick={() => {
                                        let send = {
                                            name: this.state.name || info.name,
                                            description: this.state.description || info.description,
                                            price: this.state.price || info.price,
                                            stock: this.state.stock || info.stock
                                        }
                                        this.props.putProduct(info.id, send).then(this.setState({edit: false}));
                                    }}>submit</button>
                                    <button onClick={() => this.setState({edit: false})}>cancel</button>
                                </div>
                            ) : (
                                <div>
                                    <h1>{info.name}</h1>
                                    <h3>{info.description}</h3>
                                    <p>{info.price.toFixed(2)}</p>
                                    <p>{info.stock}</p>
                                    <button onClick={() => {
                                        let info2 = Object.assign({}, info, { count: 1 });
                                        if ( localStorage.getObject('|||||') ) {
                                            let item = localStorage.getObject('|||||'), filtered = item.filter(x => x.id === info.id);
                                            if ( filtered.length ) {
                                                filtered[0].count += 1;
                                                return localStorage.setObject('|||||', item);
                                            } else {
                                                item.push(info2);
                                                return localStorage.setObject('|||||', item);
                                            }
                                        } else {
                                            return localStorage.setObject('|||||', [info2]);
                                        }
                                    }}>Add to Order</button>
                                    {localStorage.getObject('auth-token').emp_type === 'Owner' || localStorage.getObject('auth-token').emp_type === 'Warehouse' ? (
                                        <button onClick={() => this.setState({edit: true})}>edit</button>
                                    ) : false}
                                </div>
                            )}
                        </div>
                    )
                }}
            </Query>
        )
    }
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { putProduct })(ProductPage);