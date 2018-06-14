import React from 'react'
import { storiesOf } from '@storybook/react'
import { FrameInject } from './frame.inject'

class FrameWrapper extends React.Component {
  componentDidMount() {
    FrameInject()
      .inject({
        url: '/frame.test.resize.html',
        showFrame: this.props.showFrame
      })
      .then(frameElement => {
        this.frameElement = frameElement
        window.addEventListener('message', this.handleMessage, false)
      })
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.handleMessage, false)
    FrameInject().remove()
  }

  handleMessage = message => {
    console.log('Updating')
    this.frameElement.style.height = `${message.data.height}px`
  }

  render() {
    return (
      <React.Fragment>
        <h2>IMPORTANT!</h2>
        <p style={{ maxWidth: '400px' }}>
          Frame requires that `npm start` has been run at least once as it
          relies on compiled HTML and associated scripts be loaded into the
          frame.
        </p>
        <p style={{ maxWidth: '400px' }}>
          Check the console log to confirm message transfer is effeciently
          running.
        </p>
      </React.Fragment>
    )
  }
}

storiesOf('Views|Frame', module)
  .add('Resizing', () => <FrameWrapper showFrame={false} />)
  .add('Resizing - Show Frame', () => <FrameWrapper showFrame={true} />)
