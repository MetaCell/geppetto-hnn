import React from 'react';

import Help from './Help';
import CreateTextField from './createComponent/CreateTextField';

export default ({ help, ...others }) => {
  let Component;

  if (others.component == "TextField") {
    Component = <CreateTextField {...others}/>
  }

  return (
    <div key={others.id} className="netpyneField">
      {Component}
      <Help help={help} />
    </div>
  )
}