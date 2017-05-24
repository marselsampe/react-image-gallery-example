import React from 'react';
import Header from './Header';

import Content from './Content';

class Main extends React.Component {
    constructor() {
        super();

        this.state = {
            activeAlbum: null
        };

        this.handleAlbumChange = this.handleAlbumChange.bind(this);
    }

    handleAlbumChange(i) {
        this.setState({ activeAlbum: i });
    }

    render() {
        return (
            <div>
                <Header
                    activeAlbum={this.state.activeAlbum}
                    onAlbumChange={this.handleAlbumChange} />
                <Content
                    activeAlbum={this.state.activeAlbum} />
            </div>
        );
    }
}

export default Main;