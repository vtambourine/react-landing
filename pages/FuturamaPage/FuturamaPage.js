import React, { PropTypes } from 'react';
import Layout from 'Layout';
import BillboardPanel from 'BillboardPanel';

import './FuturamaPage.styl';

class FuturamaPage extends React.Component {

    static childContextTypes = {
        user: PropTypes.object.isRequired,
        content: PropTypes.object.isRequired
    }

    getChildContext() {
        return {
            user: this.props.user,
            content: this.props.content
        }
    }

    render() {
        return (
            <Layout>
                <div className="FuturamaPage">
                    <BillboardPanel />
                </div>
            </Layout>
        );
    }

}

export default FuturamaPage;
