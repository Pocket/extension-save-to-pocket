import { storiesOf } from '@storybook/react'
import { FrameInjector } from './frame'
import React from 'react'

class FrameWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.frameInjector = FrameInjector()
  }

  componentDidMount() {
    this.frameInjector.inject({
      url: './frame.test.html',
      showFrame: this.props.showFrame
    })
  }

  componentWillUnmount() {
    this.frameInjector.remove()
  }

  render() {
    return (
      <React.Fragment>
        Frame Loader with variable height content.
      </React.Fragment>
    )
  }
}

storiesOf('Views|Frame', module)
  .add('Resizing', () => <FrameWrapper showFrame={false} />)
  .add('Resizing - Show Frame', () => <FrameWrapper showFrame={true} />)
