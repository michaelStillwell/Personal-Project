// React Imports
import React, { Component } from 'react';

// Routes
import routes from '../routes';
import { Header } from '../imports';

import '../Assets/css/default.min.css';

class App extends Component {
    render() {
        return (
            <div>
                <header>
                    <Header />
                </header>
                {routes}
            </div>
        );
    }
}

export default App;