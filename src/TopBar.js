import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

function TopBar(props) {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={props.onIconButtonClick}
                >
                    {props.iconButton}
                </IconButton>
                <Typography variant="h6">
                    {props.title}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default TopBar;