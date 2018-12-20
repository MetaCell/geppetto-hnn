import React from 'react';
import Fab from '@material-ui/core/Fab';

export default ({ names, selected, handleClick }) => (
  <div>
    {names.map(name => (
      <Fab
        key={name}  
        id={`Thumnail_${name}`}
        className={"actionButton"} 
        onClick={() => handleClick(name)}
        color={selected == name ? "primary" : "secondary"}
      >
        {name}
      </Fab>
    ))}
  </div>
)