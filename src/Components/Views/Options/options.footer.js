import React from 'react'
import styled from 'react-emotion'
import { Colors, Shades } from 'Elements/Colors/colors'
import { openTabWithUrl } from 'Common/interface'

const FooterWrapper = styled('footer')`
  color: ${Shades.darksmoke};
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  font-weight: 300;
  margin-top: 40px;
`

const Privacylegal = styled('button')`
  all: unset;
  cursor: pointer;
  color: inherit;
  display: block;
  margin: 10px 0 0;

  &:hover {
    color: ${Colors.teal};
  }
`

export class FooterBlock extends React.Component {
  render() {
    return (
      <FooterWrapper>
        &copy; Copyright 2017 Read It Later Inc.
        <Privacylegal
          onClick={() =>
            openTabWithUrl('https://getpocket.com/legal?src=extensions')
          }>
          Legal &amp; Privacy
        </Privacylegal>
      </FooterWrapper>
    )
  }
}
