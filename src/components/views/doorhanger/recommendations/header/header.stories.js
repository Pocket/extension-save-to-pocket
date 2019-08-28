import React from 'react'

import { storiesOf } from '@storybook/react'
import Header from './header'
storiesOf('Views | Recommendations/Header', module)
  .add('reason', () => <Header recs={{ reason: 'Chemistry', feed: [1, 2] }} />)
  .add('no reason', () => <Header recs={{ reason: '', feed: [1, 2] }} />)
  .add('no results', () => <Header recs={{ reason: '' }} />)
  .add('loading', () => <Header />)
