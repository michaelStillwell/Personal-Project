// React Imports
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

// import { getProductById } from '../../ducks/reducer';

// export function getProductById(id) {
//     console.log(id)
//     return {
//         type: GET_PRODUCT_BY_ID,
//         payload: (
//             client.query({
//                 query: gql`
//                     query($id: ID!) {
//                         getProduct(id: $id) {
//                             name
//                             description
//                             price
//                             stock
//                         }
//                     }
//                 `
//             }).then(response => (
//                 response.data.getProduct
//             )).catch(err => console.log('GET PRODUCT BY ID: ', err))
//         )
//     }
// }

const GET_PRODUCT_BY_ID = (gql`
    query($id: ID!) {
        getProduct(id: $id) {
            name
            description
            price
            stock
        }
    }
`);

const product = ({ productSelected }) => (
    <Query query={GET_PRODUCT_BY_ID} variables={{ id: productSelected }}>
        {({ loading, error, data }) => {
            if ( loading ) return 'Loading';
            if ( error ) return `Erroe! ${error.message}`;

            const info = data.getProduct[0];
            return (
                <div>
                    <h1>{info.name}</h1>
                    <h3>{info.description}</h3>
                    <p>{info.price}</p><p>{info.stock}</p>
                </div>
            );
        }}
    </Query>
);

class ProductPage extends Component {
    componentDidMount() {
        console.log(this.props)
    }

    render() {
        // console.log(product());
        return (
            <div>
                <h1>Product!</h1>
                {product({productSelected: Number(this.props.match.params.id)})}
            </div>
        )
    }
};

export default (ProductPage);