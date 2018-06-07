import React from 'react'
import { storiesOf } from '@storybook/react'
import { Header } from './header'

storiesOf('Views|Recommendations/Header', module)
  .addDecorator(story => <div style={{ width: '320px' }}>{story()}</div>)
  .add('Loading', () => <Header loading={true} />)
  .add('No Recs', () => <Header norecs={true} />)
  .add('Reason', () => <Header reason={'Puppies'} />)
  .add('Default', () => <Header />)
