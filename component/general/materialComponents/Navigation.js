import React from 'react';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import CreateComponentsFromMetadata from '../CreateComponentsFromMetadata';

const styles = {
  root: {
    width: "100%",
  },
  content: {
    marginTop: "25px"
  }
};

class Navigation extends React.Component {
  state = { currentTab: "" };

  componentDidUpdate() {
    const { models } = this.props;
    const { currentTab } = this.state;
    if (models && Object.keys(models).indexOf(currentTab) === -1) {
      this.setState({ currentTab: Object.keys(models)[0] })
    }
  }
  
  render() {
    const { currentTab } = this.state;
    const { models, tabIcons, classes } = this.props;

    if (!models || Object.keys(models).indexOf(currentTab) === -1) {
      return <div/>
    }
    return (
      <div>
        <BottomNavigation
          showLabels
          value={currentTab}
          className={classes.root}
          onChange={(event, currentTab) => this.setState({ currentTab })}
        >
          {Object.keys(models).map(tab => (
            <BottomNavigationAction 
              key={tab}
              label={tab}
              value={tab} 
              icon={<Icon className={tabIcons[tab]}/>}
            />
          ))}
        </BottomNavigation>
        <div className={classes.content}>
          {CreateComponentsFromMetadata(models[currentTab])}
        </div>
      </div>
      
    );
  }
}

export default withStyles(styles)(Navigation);