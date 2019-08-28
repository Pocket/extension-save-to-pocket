import React from 'react'

import { storiesOf } from '@storybook/react'
import Header from './header'
storiesOf('Views | Recommendations/Header', module)
  .add('w/ recs', () => <Header recs={{ reason: 'Chemistry', feed: [1, 2] }} />)
  .add('w/o recs', () => <Header recs={{ reason: '' }} />)
  .add('loading', () => <Header />)
