import React, { Component } from 'react';
import { render } from 'react-dom';
import PidList from './components/PidList.jsx';

require('../styles/styles.css');

class App extends Component {
    render () {
        return (
            <div className="wrapper">
                <div className="main">
                    Welcome to Car Monitor
                </div>
                <PidList />
            </div>
        );
    }
}

render(<App/>, document.getElementById('app'));
