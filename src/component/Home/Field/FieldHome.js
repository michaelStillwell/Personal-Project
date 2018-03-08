// React Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFeaturedProducts } from '../../../ducks/reducer';
import { Loading, Link } from '../../../imports';

class FieldHome extends Component {
    componentWillMount() {
        this.props.getFeaturedProducts();
    }

    render() {
        return (
            <div>
                {!this.props.featuredLoading ? (
                    <div>
                        <h1>Field Home Page for {this.props.user}</h1>
                        <h2>Featured Products:</h2>
                        {this.props.featuredProducts.map((x,y) => {
                            return (
                                <div key={y}>
                                    <Link to={`/product/display/${x.id}`}>
                                        <p>{x.name}</p>
                                    </Link>
                                    <p>{x.description}</p>
                                </div>
                            )
                        })}
                    </div>  
                ) : <Loading />
                }
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getFeaturedProducts })(FieldHome);