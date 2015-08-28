import React, { PropTypes } from 'react';
import Button from 'Button';

import './Layout.styl';

class Layout extends React.Component {

    static contextTypes = {
        user: PropTypes.object.isRequired,
        content: PropTypes.object.isRequired
    }

    toggleHeaderContent = () => {
        var headerNode = React.findDOMNode(this.refs.header);
        headerNode.classList.toggle('-hidden');
    }

    render() {
        return (
            <div className="Layout">
                <div className="Layout-desktop--header">
                    <div className="Layout-desktop--headerRow">
                        <div className="Layout-desktop--headerItem">
                            <div className="Layout-desktop--profile">
                                {this.context.user.name}
                            </div>
                        </div>
                        <div className="Layout-desktop--headerItem">
                            <Button className="Button" url="/">
                                Action!
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="Layout-mobile--header -hidden"
                    ref="header">
                    <div className="Layout-mobile--drawerButton"
                        onClick={this.toggleHeaderContent}></div>
                    <div className="Layout-mobile--headerContent">
                        <div className="Layout-mobile--profile">
                            {this.context.user.name}
                        </div>
                        <div className="Layout-desktop--actionButton">
                            <Button className="Button" url="/">
                                Action!
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="Layout--content">
                    {this.props.children}
                </div>
            </div>
        );
    }

}

export default Layout;
