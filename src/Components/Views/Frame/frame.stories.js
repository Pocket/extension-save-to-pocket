import { storiesOf } from '@storybook/react'
import { FrameInjector } from './frame'

storiesOf('Views|Frame', module).add('Injector', () => {
  FrameInjector()
  return true
})
