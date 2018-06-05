import React from 'react'
import styled, { keyframes } from 'react-emotion'
import { Shades } from 'Elements/Colors/colors'

const SpinnerKeyframes = keyframes`
  0% {
    transform: rotate(0deg) scale(1);
  }

  50% {
    transform: rotate(180deg) scale(0.5);
  }

  100% {
    transform: rotate(360deg) scale(1);
  }
`
const SpinnerWrapper = styled('div')`
  display: inline-block;
  width: 30px;
`
const SpinnerAnimation = styled('div')`
  display: inline-block;
  margin: 0 auto;
  position: relative;
  transform: translateY(-13px);

  > div {
    animation-fill-mode: both;
    border-radius: 100%;
    left: 0;
    position: absolute;
    top: 0;

    &:first-child {
      animation: scale 1.25s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
      background: ${Shades.overcast};
      height: 10px;
      left: -5px;
      top: 4px;
      width: 10px;
    }

    &:last-child {
      animation: ${SpinnerKeyframes} 1s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9)
        infinite;
      animation-duration: 1.25s;
      background: transparent;
      border: 1px solid ${Shades.overcast};
      border-color: ${Shades.overcast} transparent ${Shades.overcast}
        transparent;
      height: 20px;
      left: -11px;
      position: absolute;
      top: -2px;
      width: 20px;
    }
  }
`

export function Spinner() {
  return (
    <SpinnerWrapper>
      <SpinnerAnimation>
        <div />
        <div />
      </SpinnerAnimation>
    </SpinnerWrapper>
  )
}
