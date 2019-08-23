import React from 'react'

import { storiesOf } from '@storybook/react'
import Header from './header'
storiesOf('Recommendations | Header', module)
  .add('with recs and feed', () => <Header recs={{ reason: 'with recs and feed', feed: [1, 2] }} />)
  .add('with recs no feed', () => <Header recs={{reason: 'with recs no feed'}} />)
  .add('loading - no recs', () => <Header />)
