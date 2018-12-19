import React from 'react';
import Help from './Help';
import CreateTextField from './createComponent/CreateTextField';
import CreateCheckbox from './createComponent/CreateCheckbox';

export default ({ hintText, component, ...others}) => {
  let field;

  switch (component) {
    case "TextField":
      field = <CreateTextField {...others}/>
      break;
    case "Checkbox":
      field = <CreateCheckbox {...others}/>
  }
  // if (others.component == "TextField") {
  //   field = <CreateTextField {...others}/>
  // }
  // else if (others.component == "Checkbox") {
  //   field = <CreateCheckbox {...others}/>
  // }

  return (
    <div key={others.id} className="netpyneField">
      {field}
      <Help help={hintText} component={component}/>
    </div>
  )
}