import React from 'react';
import HealingOutlined from '@material-ui/icons/HealingOutlined';
import StraightenOutlined from '@material-ui/icons/StraightenOutlined';
import SettingsInputAntennaOutlined from '@material-ui/icons/SettingsInputAntennaOutlined';

import Navigation from '../../general/materialComponents/Navigation';

export default ({ selection }) => { 
  let model = {}
  let labels = Object.keys(metadata.cellParams[selection])
  labels.forEach((label, index) => model[index] = metadata.cellParams[selection][label])

  const icons = [
    <StraightenOutlined/>,
    <SettingsInputAntennaOutlined/>,
    <HealingOutlined/>,
  ]

  return (
    <Navigation
      icons={icons}  
      labels={labels}
      models={model}
    />
  )
}
