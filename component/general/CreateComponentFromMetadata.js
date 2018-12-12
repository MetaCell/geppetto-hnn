import React from 'react';

import Help from './Help';
import CreateTextField from './createComponent/CreateTextField';

export default ({ help, ...others }) => {
  let Component;

  if (others.component == "TextField") {
    Component = <CreateTextField {...others}/>
  }

  return (
    <div className="netpyneField">
      {Component}
      <Help help={help} />
    </div>
  )
}