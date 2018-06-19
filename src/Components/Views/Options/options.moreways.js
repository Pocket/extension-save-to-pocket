import React from 'react'
import styled from 'react-emotion'
import { Shades, Colors } from 'Elements/Colors/colors'
import { Icon } from 'Elements/Icons/icon'
import { buttonReset } from 'Elements/Buttons/button'
import { localize } from 'Common/_locales/locales'
import { openTabWithUrl } from 'Common/interface'

const SectionBlockFull = styled('div')`
  border-top: 1px solid ${Shades.snow};
  padding-bottom: 40px;
`

const WaysTitle = styled('div')`
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: ${Shades.darksmoke};
  padding: 20px 0 35px;
`
const WaysList = styled('div')`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  text-align: center;
`

const WaysLink = styled('button')`
  ${buttonReset};
  display: flex;
  flex-direction: column;
  color: ${Shades.darksmoke};
  &:hover {
    color: ${Colors.teal};
  }
`

export class MoreWaysBlock extends React.Component {
  // TODO: Move these links to constants
  openNewTabExt = () =>
    openTabWithUrl(
      'https://chrome.google.com/webstore/detail/pocket-new-tab/mlnnopicjonfamklpcdfnbcomdlopmof?authuser=1'
    )
  openAndroid = () => openTabWithUrl('http://getpocket.com/android/')
  openIos = () => openTabWithUrl('http://getpocket.com/iphone/')
  openMac = () => openTabWithUrl('http://getpocket.com/mac/')

  render() {
    return (
      <SectionBlockFull>
        <WaysTitle>
          {localize('options_page', 'more_ways_to_save_title')}
        </WaysTitle>
        <WaysList>
          <WaysLink>
            <Icon name="newtab" margin="0 0 10px" size="48px" />
            <div>Pocket New Tab</div>
          </WaysLink>
          <WaysLink>
            <Icon name="android" margin="0 0 10px" size="48px" />
            <div>Android</div>
          </WaysLink>
          <WaysLink>
            <Icon name="ios" margin="0 0 10px" size="48px" />
            <div>iPhone/Ipad</div>
          </WaysLink>
          <WaysLink>
            <Icon name="mac" margin="0 0 10px" size="48px" />
            <div>Mac</div>
          </WaysLink>
        </WaysList>
      </SectionBlockFull>
    )
  }
}
