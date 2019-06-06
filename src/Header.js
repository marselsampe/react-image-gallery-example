import React, { Fragment } from 'react';

import MenuIcon from '@material-ui/icons/Menu';

import TopBar from './TopBar';
import Navigation from './Navigation';

class Header extends React.Component {
    constructor() {
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
            <Fragment>
                <TopBar
                    title={'My Album Gallery'}
                    iconButton={<MenuIcon />}
                    onIconButtonClick={this.handleNavigationToggle}/>
                <Navigation
                    isNavigationOpen={this.state.isNavigationOpen}
                    onNavigationToggle={this.handleNavigationToggle}
                    selectedAlbum={this.props.selectedAlbum}
                    onAlbumChange={this.props.onAlbumChange} />
            </Fragment >
        );
    }
}

export default Header;