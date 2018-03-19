// React Imports
import React, { Component } from 'react';

import background from '../../Assets/fqeseGQ.gif';

class NoPage extends Component {
    render() {
        return (
            <div className='nopage'>
                <h1>404 Page Not Found</h1>
                <img src={background} alt='Page Not Found' />
            </div>
        )
    }
}

export default NoPage;