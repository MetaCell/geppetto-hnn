import React from 'react';
import TextField from '@material-ui/core/TextField';

import PythonControlledCapability from '../../../../../js/communication/geppettoJupyter/PythonControlledCapability';

export default ({ id, path, label, field_type, default_value }) => {
  let extraProps = {
    id,
    label,
    type: field_type,
    realType: field_type,
  }
  
  if (default_value != '') {
    extraProps['default'] = default_value;
  }

  const PythonControlledTextField = PythonControlledCapability
    .createPythonControlledControl(TextField);
  
  return (
    <PythonControlledTextField 
      model={path}   
      {...extraProps} 
    />
  )
}
