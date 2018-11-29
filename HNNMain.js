import React from 'react';

import HNNTabs from './components/HNNTabs';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import BookIcon from '@material-ui/icons/Book';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { withStyles } from '@material-ui/core';
import HNNAppBar from './components/HNNAppBar';

class HNNMain extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <div>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <HNNAppBar/>
                        <span style={{ width: "100%" }}>
                            <HNNTabs/>
                        </span>
                        <IconButton color="inherit">
                            <BookIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}
export default HNNMain;