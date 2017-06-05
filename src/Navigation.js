import React from 'react';
import AppBar from 'material-ui/AppBar';
import CircularProgress from 'material-ui/CircularProgress';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import IconDone from 'material-ui/svg-icons/action/done';
import IconClose from 'material-ui/svg-icons/navigation/close';
import MenuItem from 'material-ui/MenuItem';

import serviceClientManager from './ServiceClientManager';

class Navigation extends React.Component {
    constructor(props) {
        super();

        this.state = { listAlbum: null };

        this.loadListAlbumSuccess = this.loadListAlbumSuccess.bind(this);
        this.loadListAlbumError = this.loadListAlbumError.bind(this);
        this.createAlbumMenuItem = this.createAlbumMenuItem.bind(this);
    }

    componentDidMount() {
        this.loadListAlbum();
    }

    loadListAlbum() {
        serviceClientManager.retrieveListAlbum(this.loadListAlbumSuccess, this.loadListAlbumError);
    }

    loadListAlbumSuccess(result) {
        this.setState({ listAlbum: result });
    }

    loadListAlbumError(message) {
        alert('error : ' + message);
    }

    handleSelectAlbum(albumId) {
        if (this.props.activeAlbum !== albumId)
            this.props.onAlbumChange(albumId);
        this.props.onNavigationToggle();
    }

    createAlbumMenuItem(listAlbum) {
        return listAlbum.map((album) => {
            const selectedIcon = (this.props.activeAlbum === album.id) ? <IconDone /> : null;
            return (
                <MenuItem key={album.id} onTouchTap={() => this.handleSelectAlbum(album.id)} rightIcon={selectedIcon}>
                    Album {album.id}
                </MenuItem>
            );
        });
    }

    render() {
        const listAlbum = this.state.listAlbum;
        let navigationItems = null;

        if (!listAlbum) {
            navigationItems = (
                <div style={{ textAlign: 'center', marginTop: 20 }}>
                    <CircularProgress />
                </div>
            );
        } else {
            navigationItems = (
                <div>
                    {this.createAlbumMenuItem(listAlbum)}
                </div>
            );
        }

        return (
            <div>
                <Drawer
                    docked={false}
                    open={this.props.isNavigationOpen}>
                    <AppBar
                        title="Album List"
                        iconElementLeft={<IconButton><IconClose /></IconButton>}
                        onTouchTap={this.props.onNavigationToggle} />
                    {navigationItems}
                </Drawer>
            </div>
        );
    }
}

export default Navigation;