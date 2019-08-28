import * as Icon from 'components/icons'
import React, { useState } from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { COLORS } from 'elements/colors/colors'
const { $white, $pitch, $overcast, $teal } = COLORS
const SponsorMenu = styled.div`
  float: right;
`
const SponsorLabel = styled.span`
  color: ${$overcast};
  cursor: pointer;
  font-size: 10px;
  font-weight: 200;
  line-height: inherit;
  text-transform: uppercase;
  vertical-align: baseline;
`
const SponsorDropdown = styled.div`
  background: ${$white};
  border-radius: 4px;
  box-shadow: 0 3px 8px 1px rgba(0, 0, 0, 0.5);
  list-style-type: none;
  margin: 0;
  padding: 7px 0;
  position: absolute;
  right: 10px;
  top: 25px;
  z-index: 3;

  button,
  a {
    @include pocketButton;

    box-sizing: border-box;
    color: ${$pitch};
    display: block;
    font-size: 16px;
    padding: 4px 10px;
    width: 100%;

    &:hover {
      background: ${$teal};
      color: ${$white};
    }
  }
`

SpocMenu.propTypes = {
  spocRemove: PropTypes.func,
  tabId: PropTypes.number,
  itemId: PropTypes.number
}
export default function SpocMenu({ spocRemove, tabId, itemId }) {
  const [dropActive, setDropActive] = useState(false)

  let hoverTimer
  const onHover = () => {
    clearTimeout(hoverTimer)
    setDropActive(true)
  }

  const offHover = () => {
    hoverTimer = setTimeout(() => {
      setDropActive(false)
    }, 250)
  }

  const removeSpoc = () => {
    spocRemove(tabId, itemId)
  }

  return (
    <SponsorMenu>
      <SponsorLabel onMouseOver={onHover} onMouseOut={offHover}>
        Sponsored
        {Icon.CarretDown({
          display: 'inline-block',
          verticalAlign: 'inherit',
          height: '8px',
          fill: 'currentColor'
        })}
      </SponsorLabel>
      {dropActive && (
        <SponsorDropdown onMouseOver={onHover} onMouseOut={offHover}>
          <li>
            <button onClick={removeSpoc}>
              {Icon.Hide({
                width: '18px',
                height: '18px'
              })}{' '}
              Hide This
            </button>
          </li>
          <li>
            <a
              href="https://help.getpocket.com/customer/portal/articles/2061219"
              rel="noreferrer noopener"
              target="_blank">
              {Icon.About({
                width: '18px',
                height: '18px'
              })}{' '}
              About Sponsored Posts
            </a>
          </li>
          <li>
            <a
              href="https://getpocket.com/premium/hide_sponsorship"
              rel="noreferrer noopener"
              target="_blank">
              {Icon.HideAll({
                width: '18px',
                height: '18px'
              })}{' '}
              Hide All Sponsored Posts
            </a>
          </li>
        </SponsorDropdown>
      )}
    </SponsorMenu>
  )
}
