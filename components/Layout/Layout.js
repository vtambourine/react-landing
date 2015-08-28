import React, { PropTypes } from 'react';
import Button from '../Button';

import './Layout.styl';

class Layout extends React.Component {

    static contextTypes = {
        user: PropTypes.object.isRequired,
        content: PropTypes.object.isRequired
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
                <div className="Layout-mobile--header">
                    <div className="Layout-mobile--profile">
                        {this.context.user.name}
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
