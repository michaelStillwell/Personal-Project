// React Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../../ducks/reducer';
import { Link } from '../../../imports';

class FieldHeader extends Component {
    getHamburger() {
        let x = document.getElementById('hamburger');
        if ( x.className === 'hamburger' ) {
            x.className += ' toggle_on';
        } else {
            x.className = 'hamburger';
        }
        console.log(x.className)
    }

    render() {
        let win = window.innerWidth > 400;
        return (
            <div className='header-container'>
                {
                    win ? (
                        <h1>Header for the Owner</h1>
                    ) : (
                        <h1>Owner</h1>
                    )
                }
                <button id='hamburger' className='hamburger'onClick={this.getHamburger} />
                <nav>
                    <Link to='/'>
                        <button>Home</button>
                    </Link>
                    <Link to='/browse'>
                        <button>Browse</button>
                    </Link>
                    <Link to='/orders'>
                        <button>Orders</button>
                    </Link>
                    <Link to='/employees'>
                        <button>Employees</button>
                    </Link>
                    <Link to='/'>
                    <button onClick={() => this.props.logoutUser()}>Logout</button>
                    </Link>
                </nav>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { logoutUser })(FieldHeader);