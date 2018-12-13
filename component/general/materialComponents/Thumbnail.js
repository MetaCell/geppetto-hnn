import React from 'react';
import Fab from '@material-ui/core/Fab';

export default ({ name, selected, handleClick }) => (
  <Fab 
    id={`Thumnail_${name}`}
    className={"actionButton"} 
    onClick={() => handleClick(name)}
    color={selected ? "primary" : "secondary"}
  >
    {name}
  </Fab>
)
