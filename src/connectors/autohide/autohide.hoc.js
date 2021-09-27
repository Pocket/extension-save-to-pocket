import React, { useState, useRef } from 'react'

export const withAutoHider = (WrappedComponent) => ({ ...props }) => {
  const [hasTimedOut, setHasTimedOut] = useState(false)
  const initialDelay = 5000
  const delay = 2500
  let timer = useRef(null)

  const beginTiming = () => {
    clearTimeout(timer.current)
    timer.current = setTimeout(onTimeout, initialDelay)
  }

  const startTimer = () => {
    clearTimeout(timer.current)
    timer.current = setTimeout(onTimeout, delay)
  }

  const resetTimer = () => {
    clearTimeout(timer.current)
    setHasTimedOut(false)
  }

  const onTimeout = () => {
    setHasTimedOut(true)
  }

  return (
    <WrappedComponent
      {...props}
      beginTiming={beginTiming}
      startTimer={startTimer}
      resetTimer={resetTimer}
      hasTimedOut={hasTimedOut}
    />
  )
}
