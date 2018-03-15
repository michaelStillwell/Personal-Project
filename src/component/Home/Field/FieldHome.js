// React Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFeaturedProducts } from '../../../ducks/reducer_featured';
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
                    !this.props.featured.featuredLoading ? (
                        <div>
                            <h1>Field Home Page for {this.props.login.user}</h1>
                            <h2>Featured Products:</h2>
                            {this.props.featured.featuredProducts.map((x,y) => {
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
                        !this.props.featured.featuredLoading ? (
                            <div className='home-mobile'>
                                <h1>Welcome {this.props.user}</h1>
                                <h2>Featured Products:</h2>
                                {this.props.featured.featuredProducts.map((x,y) => {
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

const mapStateToProps = state => {
    return {
        login: state.reducer_login, 
        featured: state.reducer_featured
    }
}

export default connect(mapStateToProps, { getFeaturedProducts })(FieldHome);