import React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { withStyles } from '@material-ui/core';

const styles = theme => ({

    tabsIndicator: {
        backgroundColor: theme.status.active,
    },
    tabLabel: {
        color: "white",
        fontSize: "15px",
    },
});

class HNNTabs extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        value: 0,
    };
    
    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;
        return (
                <Tabs fullWidth value={value} onChange={this.handleChange}
                    classes={{indicator: classes.tabsIndicator}}>
                    <Tab className={classes.tabLabel} label="Set Parameters" />
                    <Tab className={classes.tabLabel} label="Run Simulation" />
                </Tabs>
          )
        
    }
}

export default withStyles(styles)(HNNTabs);