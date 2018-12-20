import React from 'react';
import HealingOutlined from '@material-ui/icons/HealingOutlined';
import StraightenOutlined from '@material-ui/icons/StraightenOutlined';
import SettingsInputAntennaOutlined from '@material-ui/icons/SettingsInputAntennaOutlined';

export default (name) => {
  switch (name) {
    case "cellParams":
      return [
        <StraightenOutlined key="syn"/>,
        <SettingsInputAntennaOutlined key="geom" />,
        <HealingOutlined key="bio" />,
      ]
    case "evokedInputs":
      return [
        <StraightenOutlined key="syn"/>,
        <SettingsInputAntennaOutlined key="geom" />,
        <HealingOutlined key="bio" />,
      ]
    case "poisson":
      return [
        <StraightenOutlined key="syn"/>,
        <SettingsInputAntennaOutlined key="geom" />,
        <HealingOutlined key="bio" />,
      ]
    case "rhythmicDistal":
      return [
        <StraightenOutlined key="syn"/>,
        <SettingsInputAntennaOutlined key="geom" />,
        <HealingOutlined key="bio" />,
      ]
    case "rhythmicProximal":
      return [
        <StraightenOutlined key="syn"/>,
        <SettingsInputAntennaOutlined key="geom" />,
        <HealingOutlined key="bio" />,
      ]
    case "tonic":
      return [
        <StraightenOutlined key="syn"/>,
        <StraightenOutlined key="syn"/>,
      ]
  }
}