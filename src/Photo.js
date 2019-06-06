import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

class Photo extends React.Component {
    isComponentMounted = false;
    downloadedImage = new Image();

    constructor() {
        super();

        this.state = {
            loadedImageSrc: null
        };

        this.loadImage = this.loadImage.bind(this);
        this.loadImageSuccess = this.loadImageSuccess.bind(this);
    }

    componentDidMount() {
        this.isComponentMounted = true;
        this.loadImage(this.props.photo.thumbnailUrl, this.loadImageSuccess);
    }

    componentWillUnmount() {
        this.isComponentMounted = false;
        this.downloadedImage.src = '';
    }

    loadImage(imageUrl, successCallback) {
        this.downloadedImage.onload = function () {
            successCallback(this.src);
        };
        this.downloadedImage.src = imageUrl;
    }

    loadImageSuccess(loadedImageSrc) {
        if (!this.isComponentMounted)
            return;
        this.setState({ loadedImageSrc: loadedImageSrc });
    }

    render() {
        const photo = this.props.photo;
        const loadedImageSrc = this.state.loadedImageSrc;
        
        return (
            <Card style={{ display: 'inline-block', minHeight: 260, width: 260, margin: 10, verticalAlign: 'top', textAlign: 'left' }}>
                <CardActionArea>
                    {(
                        loadedImageSrc
                            ? <CardMedia image={loadedImageSrc} title={photo.title} style={{ height: 150 }} />
                            : <CircularProgress style={{ margin: '40%' }} />
                    )}
                    <CardContent>
                        <Typography 
                            gutterBottom 
                            variant="h6" 
                            component="h2"
                        >
                            {'Photo ' + photo.id}
                        </Typography>
                        <Typography 
                            variant="body2" 
                            color="textSecondary" 
                            component="p"
                        >
                            {photo.title}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }
}

export default Photo;