import React from 'react';
import AppBar from 'material-ui/AppBar';

import Navigation from './Navigation';

class Header extends React.Component {
    constructor(props) {
        super();

        this.state = {
            isNavigationOpen: false
        }

        this.handleNavigationToggle = this.handleNavigationToggle.bind(this);
    }

    handleNavigationToggle() {
        this.setState({ isNavigationOpen: !this.state.isNavigationOpen });
    }

    render() {
        return (
            <div>
                <AppBar
                    title="My Album Gallery"
                    onTouchTap={this.handleNavigationToggle} />
                <Navigation
                    isNavigationOpen={this.state.isNavigationOpen}
                    onNavigationToggle={this.handleNavigationToggle}
                    activeAlbum={this.props.activeAlbum}
                    onAlbumChange={this.props.onAlbumChange} />
            </div>
        );
    }
}

export default Header;