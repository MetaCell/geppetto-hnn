import React, { memo } from 'react';
import MaterialCheckbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PythonControlledCapability from '../../../../../js/communication/geppettoJupyter/PythonControlledCapability';

/*
 * THIS COMPONENT EMULATES A CHECKBOX AS PER OLD MATERIAL_UI 
 * SO THAT PYTHONCONTROLEDCAPABILITY CAN BE USED DIRECTLY
 */
class Checkbox extends React.Component {

  render () {
    const { label, checked, onCheck, id } = this.props;
    return (
      <FormControlLabel
        control={
          <MaterialCheckbox
            id={id}
            checked={typeof(checked) == "boolean" ? checked : checked[0]}
            onChange={onCheck.bind(this)}
          />
        }
        label={label}
      />
    )
  }
}


export default memo(({ id, label }) => {
  let extraProps = {
    id,
    label
  }

  const PythonControlledCheckbox = PythonControlledCapability
    .createPythonControlledControl(Checkbox);
  
  return (
    <PythonControlledCheckbox 
      model={id}   
      {...extraProps} 
    />
  )
})