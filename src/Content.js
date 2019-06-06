import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import Photo from './Photo';
import ServiceClientManager from './ServiceClientManager';

class Content extends React.Component {
    constructor() {
        super();

        this.state = { listPhoto: null };

        this.loadListPhotoSuccess = this.loadListPhotoSuccess.bind(this);
        this.loadListPhotoError = this.loadListPhotoError.bind(this);
        this.createListPhotoGrid = this.createListPhotoGrid.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedAlbum !== this.props.selectedAlbum) {
            this.setState({ listPhoto: null });
            ServiceClientManager.retrieveListPhoto(this.props.selectedAlbum, this.loadListPhotoSuccess, this.loadListPhotoError);
        }
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
        if (!this.props.selectedAlbum) {
            return (
                <Typography
                    align="center"
                    style={{ marginTop: 40, color: 'gray' }}
                >
                    No album selected
                </Typography>
            );
        } else {
            const listPhoto = this.state.listPhoto;
            if (!listPhoto) {
                return (
                    <div style={{ textAlign: 'center' }}>
                        <CircularProgress
                            size={100}
                            thickness={10}
                            style={{ marginTop: 40 }} />
                        <Typography
                            align="center"
                            style={{ marginTop: 20, color: 'gray' }}
                        >
                            Loading Album...
                        </Typography>
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