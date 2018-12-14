import React from 'react';
import HealingOutlined from '@material-ui/icons/HealingOutlined';
import StraightenOutlined from '@material-ui/icons/StraightenOutlined';
import SettingsInputAntennaOutlined from '@material-ui/icons/SettingsInputAntennaOutlined';

import Navigation from '../../general/materialComponents/Navigation';

export default ({ selection }) => { 
  let model = {}
  let labels = Object.keys(metadata.networkParams[selection])
  labels.forEach((label, index) => model[index] = metadata.networkParams[selection][label])

  const icons = [
    <StraightenOutlined key="syn"/>,
    <SettingsInputAntennaOutlined key="geom" />,
    <HealingOutlined key="bio" />,
  ]

  return (
    <Navigation
      icons={icons}  
      labels={labels}
      models={model}
      selection={selection}
    />
  )
}
