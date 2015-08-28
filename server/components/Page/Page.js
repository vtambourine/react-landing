import fs from 'fs';
import path from 'path';
import React, { PropTypes } from 'react';

var bootstrapScript = fs.readFileSync(path.join(process.cwd(), 'client/bootstrap.js'));

class Page extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        meta: PropTypes.objectOf(PropTypes.string).isRequired,
        styles: PropTypes.array.isRequired,
        scripts: PropTypes.array.isRequired
    }

    static defaultProps = {
        styles: [],
        scripts: []
    }

    render() {
        return (
            <html>
            <head>
                <meta charSet="utf-8" />
                <meta name="keywords" content={this.props.data.meta.keywords} />
                <meta name="description" content={this.props.data.meta.description} />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, user-scalable=no" />

                <title>{this.props.data.title}</title>

                {this.props.styles.map((style, key) => <link rel="stylesheet" href={style} key={key} /> )}
            </head>
            <body>
            <div
                id="application" style={{width: '100%', height: '100%'}}
                dangerouslySetInnerHTML={{__html: this.props.body}} />

                {this.props.scripts.map((script, key) => <script src={script} key={key} /> )}

                <script id="data"
                    type="application/json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(this.props.data) }} />

                <script dangerouslySetInnerHTML={{__html: bootstrapScript}} />
            </body>
            </html>
        );
    }

}

export default Page;
