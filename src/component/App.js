// React Imports
import React, { Component } from 'react';

// Routes
import routes from '../routes';

import '../Assets/css/default.min.css';

class App extends Component {
    render() {
        return (
            <div>
                {routes}
            </div>
        );
    }
}

export default App;