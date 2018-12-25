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

    render() {
        return (
            <div>
            <Tabs fullWidth value={this.props.value} onChange={this.props.onChange}
                  classes={{indicator: this.props.classes.tabsIndicator}}>
                <Tab value='parameters' className={this.props.classes.tabLabel} label="Set Parameters" />
                <Tab value='canvas' className={this.props.classes.tabLabel} label="Run Simulation" />
            </Tabs>

            </div>

    )

    }
}

export default withStyles(styles)(HNNTabs);