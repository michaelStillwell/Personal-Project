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
        let win = window.innerWidth > 1024;
        return (
            <div className='home-container'>
                {win ? (
                    !this.props.featuredLoading ? (
                        <div>
                            <h1>Field Home Page for {this.props.user}</h1>
                            <h2>Featured Products:</h2>
                            {this.props.featuredProducts.map((x,y) => {
                                return (
                                    <div key={y} className='featured-items'>
                                        <Link to={`/product/display/${x.id}`}>
                                            {x.name}
                                        </Link>
                                        <p>{x.description}</p>
                                        <p className='price'>${x.price.toFixed(2)}</p>
                                    </div>
                                )
                            })}
                        </div>
                    ) : <Loading /> ) : (
                        !this.props.featuredLoading ? (
                            <div className='home-mobile'>
                                <h1>Welcome {this.props.user}</h1>
                                <h2>Featured Products:</h2>
                                {this. props.featuredProducts.map((x,y) => {
                                    return (
                                        <div key={y} className='featured-items-mobile'>
                                            <Link to={`product/display/${x.id}`}>
                                                {x.name}
                                            </Link>
                                            <p>{x.description}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : <Loading />
                )}
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getFeaturedProducts })(FieldHome);