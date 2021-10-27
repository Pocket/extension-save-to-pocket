import React from 'react'

import Icon from './icon'
import Error from './svg/Error'
import FacebookMono from './svg/Facebook-Mono'
import Instagram from './svg/Instagram'
import ListView from './svg/List-View'
import PocketLogo from './svg/PocketLogo'
import Settings from './svg/Settings'
import TwitterMono from './svg/Twitter-Mono'

export const ErrorIcon = (props) => (
  <Icon {...props}>
    <Error />
  </Icon>
)

export const FacebookIcon = (props) => (
  <Icon {...props}>
    <FacebookMono />
  </Icon>
)

export const InstagramIcon = (props) => (
  <Icon {...props}>
    <Instagram />
  </Icon>
)

export const ListViewIcon = (props) => (
  <Icon {...props}>
    <ListView />
  </Icon>
)

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
