import React, { memo } from 'react';
import MaterialCheckbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PythonControlledCapability from '../../../../../js/communication/geppettoJupyter/PythonControlledCapability';

// THIS COMPONENT EMULATES A CHECKBOX AS PER OLD MATERIAL_UI 
// SO THAT PYTHONCONTROLEDCAPABILITY CAN BE USED DIRECTLY
class Checkbox extends React.Component {
  onChange = this.onChange.bind(this);

  onChange(event, checked) {
    const { onCheck } = this.props;
    onCheck(event, checked);

  } 
  render () {
    const { label, checked, id } = this.props;
    return (
      <FormControlLabel
        label={label}
        control={
          <MaterialCheckbox
            id={id}
            onChange={this.onChange}
            checked={typeof(checked) == "boolean" ? checked : checked[0]}
          />
        }
      />
    )
  }
}

export default memo(({ id, label }) => {
	const extraProps = { id, label };

	const PythonControlledCheckbox = PythonControlledCapability
		.createPythonControlledControl(Checkbox);
  
	return (
		<PythonControlledCheckbox
			model={id}
			{...extraProps}
		/>
	)
})