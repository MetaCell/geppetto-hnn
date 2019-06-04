import React from 'react';
import Help from '../Help';
import CreateTextField from './CreateTextField';
import CreateCheckbox from './CreateCheckbox';

export default ({ hintText, component, ...others }) => {
  let field;

  switch (component) {
  case "TextField":
    field = <CreateTextField {...others} />
    break;
  case "Checkbox":
    field = <CreateCheckbox {...others} />
  }

  return (
    <div key={others.id} className="netpyneField">
      {field}
      <Help help={hintText} component={component} />
    </div>
  )
}
