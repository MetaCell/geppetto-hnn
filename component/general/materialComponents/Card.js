import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import bluegrey from '@material-ui/core/colors/blueGrey';

const styles = theme => ({
  heading: {
    color: "white",
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightLight,
    color: bluegrey[50],
  },
  details: {
    alignItems: 'center',
  },
  title: {
    flexBasis: '30%',
  },
  subtitle: {
    flexBasis: '60%',
    marginLeft: "25px"    
  },
});

export default withStyles(styles)(({ title, subtitle, children, classes }) => (
  <ExpansionPanel>
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <div className={classes.title}>
        <Typography className={classes.heading}>{title}</Typography>
      </div>
      <div className={classes.subTitle}>
        <Typography className={classes.secondaryHeading}>{subtitle}</Typography>
      </div>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      {children}
    </ExpansionPanelDetails>
  </ExpansionPanel>
))