import React from 'react';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    borderRadius: "30px",
    margin: "10px",
    width: "165px",
  }
}

export default ({ names, selected, handleClick, type="circle" }) => {
  if (type !== "circle") {
    return (
      <div>
        {names.map(name => (
          <Button
            key={name}  
            id={name}
            variant="contained"
            style={styles.root}
            onClick={ () => handleClick(name) }
            color={ selected == name ? "primary" : "secondary" }
          >
            {name}
          </Button>
        ))}
      </div>
    )}
  else {
    return (
      <div>
        {names.map(name => (
          <Fab
            key={name}  
            id={`Thumnail_${name}`}
            className="actionButton" 
            onClick={ () => handleClick(name) }
            color={ selected == name ? "primary" : "secondary" }
          >
            {name}
          </Fab>
        ))}
      </div>
    )
  }
}