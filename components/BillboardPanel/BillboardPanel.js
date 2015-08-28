import React, { PropTypes } from 'react';
import Button from 'Button';

import './BillboardPanel.styl';

class BillboardPanel extends React.Component {

    static contextTypes = {
        content: PropTypes.object.isRequired
    }

    render() {
        var content = this.context.content;
        return (
            <div className="BillboardPanel">
                <div className="BillboardPanel--content">
                    <div className="BillboardPanel--title">
                        {this.context.content.title}
                    </div>
                    <div className="BillboardPanel--subtitle">
                        {this.context.content.slogan}
                    </div>
                    <Button className="Button-large" url="/">Watch</Button>
                </div>
            </div>
        );
    }
}

export default BillboardPanel;
