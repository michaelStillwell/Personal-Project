// React Imports
import React, { Component } from 'react';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

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
    render() {
        return (
            <Query query={GET_PRODUCT_BY_ID} variables={{ id: Number(this.props.match.params.id)}}>
                {({ loading, error, data }) => {
                    if ( loading ) return <h1>Loading...</h1>;
                    if ( error ) console.log('PRODUCT PAGE ERROR: ', error);
                    const info = data.getProduct[0];

                    return (
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
                        </div>
                    )
                }}
            </Query>
        )
    }
};

export default ProductPage;