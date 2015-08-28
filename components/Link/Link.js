import React, { PropTypes } from 'react';
import classNames from 'classnames';

export default class Link extends React.Component {

    static propTypes = {
        /**
         * Link url.
         * @type {string}
         */
        url: PropTypes.string.isRequired,

        /**
         * Option to make link fake or sham.
         * Sham link will be rendered as span first and turn into anchor in client.
         * @type {boolean}
         */
        sham: PropTypes.bool,

        /**
         * Click event listener.
         * @type {Function}
         */
        onClick: PropTypes.func
    }

    static defaultProps = {
        sham: false
    }

    render() {
        return (
            <a onClick={this.props.onClick} className={classNames('Link', this.props.className)}
                href={this.props.url}>
                {this.props.children}
            </a>
        );
    }

}
