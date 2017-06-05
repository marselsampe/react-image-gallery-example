import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

import Photo from './Photo';
import serviceClientManager from './ServiceClientManager';

class Content extends React.Component {
    constructor(props) {
        super();

        this.state = {
            listPhoto: null
        }

        this.loadListPhoto = this.loadListPhoto.bind(this);
        this.loadListPhotoSuccess = this.loadListPhotoSuccess.bind(this);
        this.loadListPhotoError = this.loadListPhotoError.bind(this);
        this.createListPhotoGrid = this.createListPhotoGrid.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.activeAlbum !== nextProps.activeAlbum) {
            this.setState({ listPhoto: null });
            this.loadListPhoto(nextProps.activeAlbum);
        }
    }

    loadListPhoto(albumId) {
        serviceClientManager.retrieveListPhoto(albumId, this.loadListPhotoSuccess, this.loadListPhotoError);
    }

    loadListPhotoSuccess(result) {
        this.setState({ listPhoto: result });
    }

    loadListPhotoError(message) {
        alert('error : ' + message);
    }

    createListPhotoGrid(listPhoto) {
        return listPhoto.map((photo) => (
            <Photo key={photo.id} photo={photo} />
        ));
    }

    render() {
        if (!this.props.activeAlbum) {
            return (
                <div style={{ textAlign: 'center', marginTop: 40 }}>
                    No album selected
                </div>
            );
        } else {
            const listPhoto = this.state.listPhoto;
            if (!listPhoto) {
                return (
                    <div style={{ textAlign: 'center' }}>
                        <CircularProgress size={100} thickness={10} style={{ marginTop: 40 }} />
                        <div style={{ marginTop: 20, fontStyle: 'italic' }}>Loading Album...</div>
                    </div>
                );
            } else {
                return (
                    <div style={{ textAlign: 'center' }}>
                        {this.createListPhotoGrid(listPhoto)}
                    </div >
                );
            }
        }
    }
}

export default Content;