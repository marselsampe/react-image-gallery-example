import React, { Fragment } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import CloseIcon from '@material-ui/icons/Close';

import TopBar from './TopBar';
import ServiceClientManager from './ServiceClientManager';

class Navigation extends React.Component {
    constructor() {
        super();

        this.state = { listAlbum: null };

        this.loadListAlbumSuccess = this.loadListAlbumSuccess.bind(this);
        this.loadListAlbumError = this.loadListAlbumError.bind(this);
        this.createAlbumMenuItem = this.createAlbumMenuItem.bind(this);
    }

    componentDidMount() {
        ServiceClientManager.retrieveListAlbum(this.loadListAlbumSuccess, this.loadListAlbumError);
    }

    loadListAlbumSuccess(result) {
        this.setState({ listAlbum: result });
    }

    loadListAlbumError(message) {
        alert('error : ' + message);
    }

    handleSelectAlbum(albumId) {
        if (this.props.selectedAlbum !== albumId)
            this.props.onAlbumChange(albumId);
        this.props.onNavigationToggle();
    }

    createAlbumMenuItem(listAlbum) {
        return (
            <List>
                {
                    listAlbum.map((album) => {
                        const isSelected = this.props.selectedAlbum === album.id;
                        return (
                            <ListItem
                                button key={album.id}
                                style={{ backgroundColor: isSelected ? 'lightgray' : '' }}
                                onClick={() => this.handleSelectAlbum(album.id)}
                            >
                                <ListItemIcon>{isSelected ? <FolderOpenIcon /> : <FolderIcon />}</ListItemIcon>
                                <ListItemText primary={'Album ' + album.id} />
                            </ListItem>
                        );
                    })
                }
            </List>
        );
    }

    render() {
        let navigationItems = null;
        if (this.state.listAlbum) {
            navigationItems = this.createAlbumMenuItem(this.state.listAlbum);
        } else {
            navigationItems = (
                <div style={{ textAlign: 'center', marginTop: 20 }}>
                    <CircularProgress />
                </div>
            );
        }

        return (
            <Fragment>
                <Drawer
                    open={this.props.isNavigationOpen}
                    onClose={this.props.onNavigationToggle}
                >
                    <TopBar
                        title={'Album List'}
                        iconButton={<CloseIcon />}
                        onIconButtonClick={this.props.onNavigationToggle} />
                    <div
                        style={{ width: '250px' }}
                        role="presentation"
                    >
                        {navigationItems}
                    </div>
                </Drawer>
            </Fragment>
        );
    }
}

export default Navigation;