import React from 'react'

import Icon from './icon'
import Error from './svg/Error'
import FacebookMono from './svg/Facebook-Mono'
import PocketLogo from './svg/PocketLogo'
import Settings from './svg/Settings'
import Spinner from './svg/Spinner'
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

export const SpinnerIcon = (props) => (
  <Icon {...props}>
    <Spinner />
  </Icon>
)

export const TwitterIcon = (props) => (
  <Icon {...props}>
    <TwitterMono />
  </Icon>
)
