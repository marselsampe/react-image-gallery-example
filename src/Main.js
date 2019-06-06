import React, { Fragment } from 'react';

import Header from './Header';
import Content from './Content';

class Main extends React.Component {
    constructor() {
        super();

        this.state = {
            selectedAlbum: null
        };

        this.handleAlbumChange = this.handleAlbumChange.bind(this);
    }

    handleAlbumChange(i) {
        this.setState({ selectedAlbum: i });
    }

    render() {
        return (
            <Fragment>
                <Header
                    selectedAlbum={this.state.selectedAlbum}
                    onAlbumChange={this.handleAlbumChange} />
                <Content
                    selectedAlbum={this.state.selectedAlbum} />
            </Fragment>
        );
    }
}

export default Main;