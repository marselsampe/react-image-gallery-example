import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import { GridTile } from 'material-ui/GridList';
import Paper from 'material-ui/Paper';

class Photo extends React.Component {
    _isMounted = false;

    constructor(props) {
        super();

        this.state = {
            loadedImage: null
        };

        this.loadImageSuccess = this.loadImageSuccess.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.loadImage(this.props.photo.thumbnailUrl, this.loadImageSuccess);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    loadImage(imageUrl, successCallback) {
        var downloadingImage = new Image();
        downloadingImage.onload = function () {
            successCallback(this.src);
        };
        downloadingImage.src = imageUrl;
    }

    loadImageSuccess(loadedImage) {
        if (!this._isMounted)
            return;
        this.setState({ loadedImage: loadedImage });
    }

    render() {
        const photo = this.props.photo;
        const loadedImage = this.state.loadedImage;
        return (
            <Paper
                style={{ height: 260, width: 260, margin: 10, display: 'inline-block' }}
                zDepth={2}
                rounded={false}>
                <GridTile
                    key={photo.id}
                    title={"Photo " + photo.id}
                    subtitle={photo.title}
                    titleStyle={{ textAlign: 'left' }}
                    subtitleStyle={{ textAlign: 'left' }}>
                    {(loadedImage ? <img src={loadedImage} /> : <CircularProgress style={{ margin: '35%' }} />)}
                </GridTile>
            </Paper>
        );
    }
}

export default Photo;