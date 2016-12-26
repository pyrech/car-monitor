import React, { Component } from 'react';

export default class PidList extends Component {
    render () {
        const { pids, values } = this.props;

        const items = Object.keys(pids).map(name => {
            const pid = pids[name];
            const value = values[name];

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
            <div className="pid-list">
                <h2>List of all PIDS</h2>
                <ul>
                    {items}
                </ul>
            </div>
        );
    }
}

PidList.propTypes = {
    pids: React.PropTypes.object,
    values: React.PropTypes.object,
};
