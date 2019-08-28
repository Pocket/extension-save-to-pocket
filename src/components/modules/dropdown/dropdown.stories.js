import React from 'react'

import { storiesOf } from '@storybook/react'
import Dropdown from './dropdown'
import * as Icon from 'elements/icons'

const listItems = [
  {
    copy: 'archive',
    icon: Icon.Archive,
    method: () => {}
  },
  {
    copy: 'remove',
    icon: Icon.Remove,
    method: () => {}
  },
  {
    copy: 'open',
    icon: Icon.OpenPocket,
    method: () => {},
    divider: true
  },
  {
    copy: 'settings',
    icon: Icon.Settings,
    method: () => {}
  }
]
storiesOf('Modules | Dropdown', module)
  .add('active', () => {
    return (
      <Dropdown tabId="1" active={true} setStatus={() => {}} list={listItems} />
    )
  })
  .add('inactive', () => {
    return (
      <Dropdown
        tabId="1"
        active={false}
        setStatus={() => {}}
        list={listItems}
      />
    )
  })
