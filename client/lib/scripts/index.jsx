import React, { Component } from 'react';
import { render } from 'react-dom';
import PidList from './components/PidList.jsx';
import Simple from './components/widget/Simple.jsx';

require('../styles/styles.css');

class App extends Component {
    constructor() {
        super();

        this.state = {
            pids: [],
            values: {},
            loading: false,
        };
    }


    componentDidMount() {
        this.fetchList();
    }

    fetchList() {
        this.setState({
            loading: true,
        });

        fetch('/pids/list', {
            method: 'get',
        })
            .then(response => response.json())
            .then(response => {
                this.setState({
                    pids: response,
                    loading: false,
                });
                this.fetchValues();
            })
            .catch(function(err) {
                console.log(err);
            })
        ;
    }

    fetchValues() {
        const { pids } = this.state;

        const socket = io();
        let currentIndex = 0;
        const names = Object.keys(pids);

        const functionId = window.setInterval(() => {
            socket.emit('pid.request', names[currentIndex]);
            currentIndex++;

            if (currentIndex >= names.length) {
                window.clearInterval(functionId);
            }
        }, 300);

        socket.on('pid.update', msg => {
            const updatedValues = JSON.parse(msg);
            const values = this.state.values;

            updatedValues.map((pid) => {
                values[pid.name] = pid.value;
            });

            this.setState({
                values: values,
            });
        });
    }

    render () {
        const { pids, values, loading } = this.state;

        if (loading) {
            return <p>PIDs are loading</p>
        }

        if (Object.keys(pids).length < 1) {
            return <p>No PID to display</p>
        }

        return (
            <div className="wrapper">
                <div className="main">
                    Welcome to Car Monitor

                    <div className="grid">
                        <Simple pid={pids['mil_dist']} value={values['mil_dist']} />
                        <Simple pid={pids['runtm']} value={values['runtm']} />
                        <Simple pid={pids['rpm']} value={values['rpm']} />
                        <Simple pid={pids['temp']} value={values['temp']} />
                        <Simple pid={pids['ect']} value={values['ect']} />
                    </div>
                </div>
                <PidList pids={pids} values={values} />
            </div>
        );
    }
}

render(<App/>, document.getElementById('app'));
