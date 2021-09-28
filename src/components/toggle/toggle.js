import React from 'react'
import { css, cx } from 'linaria'
import PropTypes from 'prop-types'
import { COLORS } from '../colors/colors'
const { $silver, $overcast, $teal, $white, $pitch } = COLORS

const button = css`
  all: unset;
  background: ${$silver};
  border: 1px solid ${$overcast};
  border-color: ${$overcast};
  border-radius: 2em;
  cursor: pointer;
  display: inline-block;
  height: 10px;
  margin-right: 5px;
  outline: 0;
  padding: 2px;
  transition: all 0.4s ease;
  width: 20px;

  &::after {
    background: ${$white};
    border-radius: 50%;
    content: '';
    display: block;
    height: 100%;
    left: 0;
    position: relative;
    transition: all 0.2s ease;
    width: 50%;
  }
`

const buttonActive = css`
  background: ${$teal};
  &::after {
    left: '50%';
  }
`

const buttonDarkMode = css`
  border-color: ${$pitch};
`

export default function Toggle({ action, active, darkMode }) {
  const classes = cx(button, active ? buttonActive : null, darkMode ? buttonDarkMode : null)
  
  return <button className={classes} onClick={action} />
}

Toggle.propTypes = {
  darkMode: PropTypes.bool,
  active: PropTypes.bool,
  action: PropTypes.func
}
