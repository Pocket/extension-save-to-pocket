import React from 'react'

import { storiesOf } from '@storybook/react'
import Options from './options.app'
storiesOf('Options | Options', module).add('show options', () => (
  <Options
    darkMode={false}
    setup={{
      sites_twitter: true,
      on_save_recommendations: true,
      toggleRecommendations: () => {},
      account_username: 'test_user'
    }}

  />
))
