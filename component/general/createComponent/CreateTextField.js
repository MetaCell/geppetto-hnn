import React from 'react';
import TextField from '@material-ui/core/TextField';
import PythonControlledCapability from '../../../../../js/communication/geppettoJupyter/PythonControlledCapability';

const setErrorMessage = (value) => (
  new Promise((resolve, reject) => {
    if (isNaN(value)) {
      resolve({ errorMsg: 'Only float allowed' })
    }
    else {
      resolve({ errorMsg: '' })
    }
  })
)

export default ({ id, path, label, field_type }) => {
  let extraProps = {
    id,
    label,
    type: field_type,
    realType: field_type,
    validate: setErrorMessage
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
