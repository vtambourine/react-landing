import React, { PropTypes } from 'react';
import classNames from 'classnames';

import './Button.styl';

class Button extends React.Component {

    static propTypes = {
        /**
         * Button text
         * @type {string}
         */
        label: PropTypes.string,

        /**
         * Button link.
         * If present, button will be rendered as <a>.
         * @type {string}
         */
        url: PropTypes.string,

        /**
         * Click event listener.
         * @type {Function}
         */
        onClick: PropTypes.func
    }

    render() {
        var content = this.props.url
            ? content = <a className="Button--control" href={this.props.url}>{this.props.label || this.props.children}</a>
            : content = <span className="Button--control">{this.props.label || this.props.children}</span>;

        return (
            <div className={classNames('Button', this.props.className)}
                onClick={this.props.onClick}>
                {content}
            </div>
        );
    }

}

export default Button;
