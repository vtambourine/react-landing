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
                <div className="Layout--header -desktop">
                    <div className="Layout--headerRow">
                        <div className="Layout--headerItem">
                            <Button className="Button" url="/">
                                Action!
                            </Button>
                        </div>
                        <div className="Layout--headerItem">
                            <div className="Layout--profile">
                                {this.context.user.name}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Layout--header -mobile">
                    <div className="Layout--profile">
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
