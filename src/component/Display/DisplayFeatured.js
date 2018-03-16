// React Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFeaturedProducts } from '../../ducks/reducer_featured';
import { Loading, Link } from '../../imports';

class DisplayFeatured extends Component {
    componentWillMount() {
        this.props.getFeaturedProducts();
    }
    
    render() {
        let win = window.innerWidth > 1024;
        return (
            <div className='featured-container'>
                {win ? (
                    <div>
                        {!this.props.featuredLoading ? (
                            <div>
                                <h1>Featured</h1>
                                {this.props.featuredProducts.map((x,y) => {
                                    return (
                                        <div key={y}>
                                            <Link to={`/product/display/${x.id}`}>
                                                {x.name}
                                            </Link>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : <Loading />}
                    </div>
                ) : (
                    <div>
                        {!this.props.featuredLoading ? (
                            <div className='featured-mobile'>
                                <h1>Featured</h1>
                                {this.props.featuredProducts.map((x,y) => {
                                    return (
                                        <div key={y}>
                                            <Link to={`/product/display/${x.id}`}>
                                                {x.name}
                                            </Link>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : <Loading />}
                    </div>
                )}
            </div>
        )
    }
}

const mapStateToProps = state => state.reducer_featured;

export default connect(mapStateToProps, {getFeaturedProducts})(DisplayFeatured);