import React, { Component } from 'react'

export const withAutoHider = WrappedComponent => {
  class AutoHiderHOC extends Component {
    initialDelay = 5000
    delay = 2500
    state = {
      hasTimedOut: false
    }

    beginTiming = () => {
      clearTimeout(this.timer)
      this.timer = setTimeout(this.onTimeout, this.initialDelay)
    }

    startTimer = () => {
      clearTimeout(this.timer)
      this.timer = setTimeout(this.onTimeout, this.delay)
    }

    resetTimer = () => {
      clearTimeout(this.timer)
      this.setState({ hasTimedOut: false })
    }

    onTimeout = () => {
      this.setState({ hasTimedOut: true })
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          beginTiming={this.beginTiming}
          startTimer={this.startTimer}
          resetTimer={this.resetTimer}
          hasTimedOut={this.state.hasTimedOut}
        />
      )
    }
  }

  return AutoHiderHOC
}
