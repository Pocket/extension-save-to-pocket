import React from 'react'
import styled, { css } from 'react-emotion'
import { Icon } from 'Elements/Icons/icon'
import { Colors, Shades } from 'Elements/Colors/colors'
import { localize } from 'Common/_locales/locales'
import { AccountBlock } from './options.account'
import { FooterBlock } from './options.footer'
import { ShortcutBlock } from './options.shortcut'
import { SitesBlock } from './options.sites'
import { RecsBlock } from './options.recs'
import { QuestionsBlock } from './options.questions'
import { MoreWaysBlock } from './options.moreways'

/* Styles
------------------------------------------------------- */
export const SectionBlock = styled('div')`
  border-top: 1px solid ${Shades.snow};
  display: grid;
  grid-template-columns: 260px auto;
  font-size: 14px;
  padding: 20px 0;
  text-align: left;
  color: ${Shades.darksmoke};

  .sectionTitle {
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.04em;
  }

  .sectionBody {
    font-size: 16px;
  }

  .sectionCopy {
    padding: 15px 0 0;
  }
`

const OptionsWrapper = styled('div')`
  width: 700px;
  display: block;
  margin: 0 auto;
`

const HeaderBlock = styled('h1')`
  color: ${Shades.pitch};
  font-size: 28px;
  font-weight: 300;
  margin: 70px 0 0;
  padding: 0 0 20px;
`

/* Renders
------------------------------------------------------- */
export class OptionsView extends React.Component {
  render() {
    return (
      <OptionsWrapper>
        <HeaderBlock>
          <Icon name="logopocket" color={Colors.hotCoral} margin="0 8px 0 0" />
          {localize('options_page', 'header')} -{' '}
          {localize('options_page', 'save_to_pocket')}
        </HeaderBlock>

        <AccountBlock />

        <ShortcutBlock />

        <SitesBlock />

        <RecsBlock />

        <QuestionsBlock />

        <MoreWaysBlock />

        <FooterBlock />
      </OptionsWrapper>
    )
  }
}
