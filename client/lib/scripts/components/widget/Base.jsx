import React, { Component } from 'react';

export default class Base extends Component {
    renderContent() {
        throw new Error('You should override this method');
    }

    render () {
        const { pid } = this.props;

        return (
            <div className="widget">
                <div className="widget-title">{pid.description}</div>
                <div className="widget-content">
                    {this.renderContent()}
                </div>
            </div>
        );
    }
}

Base.propTypes = {
    pid: React.PropTypes.object.isRequired,
    value: React.PropTypes.any,
};
