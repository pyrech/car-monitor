import React, { Component } from 'react';

export default class PidList extends Component {
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
        const socket = io();
        let currentIndex = 0;

        const functionId = window.setInterval(() => {
            socket.emit('pid.request', this.state.pids[currentIndex].name);
            currentIndex++;

            if (currentIndex >= this.state.pids.length) {
                window.clearInterval(functionId);
            }
        }, 300);

        socket.on('pid.update', msg => {
            const pids = JSON.parse(msg);

            const values = this.state.values;

            pids.map((pid) => {
                values[pid.name] = pid.value;
            });

            this.setState({
                values: values,
            });
        });
    }

    render () {
        if (this.state.loading) {
           return <p>PIDs are loading</p>
        }

        if (this.state.pids.length < 1) {
           return <p>No PID to display</p>
        }

        const items = this.state.pids.map(pid => {
            const value = this.state.values[pid.name];
            const formatValue = value => {
                if (value === undefined) {
                    return 'NC';
                }

                let result = value;

                if (pid.unit) {
                    result += ' ' + pid.unit;
                }

                return result;
            };

            return (
                <li key={pid.name}>
                    <span className="name">{pid.description}</span>
                    {' '}
                    <span className={'value ' + (value !== undefined ? 'ok' : 'nc')}>{formatValue(value)}</span>
                </li>
            );
        });

        return (
            <ul className="pid-list">
                {items}
            </ul>
        );
    }
}
