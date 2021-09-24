import React from 'react'

import { storiesOf } from '@storybook/react'
import Dropdown from './dropdown'
import * as Icon from 'elements/icons'

const settings =   {
  copy: 'Settings',
  icon: Icon.Settings,
  method: () => {}
}

const logOut = {
  copy: 'Logout',
  // icon: Icon.Profile,
  method: () => {}
}


const listItems = [
  {
    copy: 'Archive Page',
    icon: Icon.Archive,
    method: () => {}
  },
  {
    copy: 'Remove Page',
    icon: Icon.Remove,
    method: () => {}
  },
  {
    copy: 'Open My List',
    // icon: Icon.OpenPocket,
    method: () => {},
    divider: true
  }
]

const listItemsSettings = [...listItems, settings]
const listItemsLogOut = [...listItems, logOut]

storiesOf('Modules | Dropdown', module)
  .add('w/ settings', () => {
    return (
      <Dropdown tabId="1" active={true} setStatus={() => {}} list={listItemsSettings} />
    )
  })
  .add('w/ log out', () => {
    return (
      <Dropdown tabId="1" active={true} setStatus={() => {}} list={listItemsLogOut} />
    )
  })
  .add('inactive', () => {
    return (
      <Dropdown
        tabId="1"
        active={false}
        setStatus={() => {}}
        list={listItemsSettings}
      />
    )
  })
