import React from 'react';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  lightTooltip: {
    fontSize: 12,
    boxShadow: theme.shadows[1],
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.common.white,
  },
  icon: {
    width: "46px",
    height: "48px",
    padding: "12px"
  }

});

export default withStyles(styles)(({ onClick, tooltip, disabled, className, classes }) => {
  let content;
  if (disabled) {
    content = <Icon color="disabled" className={`${className} ${classes.icon}`} />
  } 
  else {
    content = (
      <IconButton 
        color="primary"
        disabled={disabled}
        onClick={() => onClick()}
        className={className}
      />
    )
  }
  return (
    <Tooltip 
      title={tooltip} 
      placement="left"
      disableFocusListener
      disableTouchListener
      classes={{ tooltip: classes.lightTooltip }}
    >
      {content}
    </Tooltip>
  )
})