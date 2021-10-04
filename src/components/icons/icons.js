import React from 'react'

import Icon from './icon'
import PocketLogo from './svg/PocketLogo'
import Settings from './svg/Settings'
import TwitterMono from './svg/Twitter-Mono'

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

export const TwitterIcon = (props) => (
  <Icon {...props}>
    <TwitterMono />
  </Icon>
)
