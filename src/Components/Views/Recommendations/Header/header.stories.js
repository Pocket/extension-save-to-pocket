import React from 'react'
import { storiesOf } from '@storybook/react'
import { Header } from './header'

storiesOf('Views|Recommendations/Header', module)
  .add('Loading', () => <Header loading={true} />)
  .add('No Recs', () => <Header norecs={true} />)
  .add('Reason', () => <Header reason={'Puppies'} />)
  .add('Default', () => <Header />)
