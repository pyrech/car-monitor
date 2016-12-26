import React, { Component } from 'react';
import Base from './Base.jsx';

export default class Simple extends Base {
    renderContent() {
        const { pid, value } = this.props;

        return (
            <div className="simple-widget">
                <span className="simple-widget-value">{value !== undefined ? value : '-'}</span>
                <span className="simple-widget-unit">{pid.unit}</span>
            </div>
        );
    }
}
