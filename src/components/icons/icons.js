import React from 'react'

import Icon from './icon'
import PocketLogo from './svg/PocketLogo'
import Settings from './svg/Settings'

export const PocketLogoIcon = (props) => (
  <Icon {...props}>
    <PocketLogo />
  </Icon>
)

export const SettingsIcon = (props) => (
  <Icon {...props}>
    <Settings />
  </Icon>
)
