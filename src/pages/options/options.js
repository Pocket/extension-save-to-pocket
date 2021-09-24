import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import {
  PocketLogo,
  PocketNewtab,
  AndroidLogo,
  IphoneIpad,
  Mac
} from 'elements/icons'
import Toggle from 'elements/toggle/toggle'
import { getBool } from 'common/utilities'
import { openTabWithUrl } from 'common/interface'
import { localize } from 'common/_locales/locales'
import { AUTH_URL, LOGOUT_URL, SET_SHORTCUTS } from 'common/constants'
import styled from '@emotion/styled'
import { COLORS } from 'components/elements/colors/colors'
import { TYPOGRAPHY } from 'common/styles/variables'
import { mixin_pocketButton } from 'common/styles/components'
import { getSetting } from 'common/interface'
import { sendMessage } from 'common/interface'
import { TOGGLE_ON_SAVE_RECS } from 'actions'
import { TOGGLE_TWITTER } from 'actions'

const {
  $pitch,
  $gray,
  $snow,
  $tar,
  $darksmoke,
  $teal,
  $coal,
  $emerald
} = COLORS
const { $fontstackDefault } = TYPOGRAPHY

const OptionsButtonLink = styled.button`
  ${mixin_pocketButton}
  color: ${$coal};
  text-decoration: underline;

  &:hover {
    color: ${$emerald};
  }
`
const OptionsContainer = styled.div`
  box-sizing: border-box;
  display: inline-block;
  font-family: ${$fontstackDefault};
  margin-bottom: 80px;
  padding: 0 30px;
  width: 700px;

  @media (min-width: 320px) and (max-width: 767px) {
    width: 100%;
  }
`
const OptionsTitle = styled.h1`
  color: ${(props) => (props.darkMode ? $gray : $pitch)};
  font-size: 28px;
  font-weight: 300;
  margin: 70px 0 0;
  padding: 0 0 20px;
  text-align: left;
`
const OptionsSection = styled.div`
  align-items: center;
  border-top: 1px solid ${$snow};
  display: flex;
  font-size: 14px;
  justify-content: flex-start;
  padding: 20px 0;
  text-align: left;

  .darkMode & {
    border-color: ${$tar};
  }

  @media (min-width: 320px) and (max-width: 767px) {
    flex-direction: column;
  }
`
const OptionsSectionTitle = styled.div`
  color: ${(props) => (props.darkMode ? $gray : $darksmoke)};
  display: block;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.04em;
  margin-right: 35px;
  padding-bottom: 5px;
  text-transform: uppercase;
  width: 230px;
  @media (min-width: 320px) and (max-width: 767px) {
    margin-bottom: 20px;
    width: 100%;
  }
`
const OptionsSectionContent = styled.div`
  display: flex;
`
const OptionsSectionContentFull = styled.div`
  display: block;
  width: 100%;
`
const OptionsContentFullBlock = styled.a`
  color: ${$darksmoke};
  display: block;
  margin: 20px 0 10px;
  text-align: center;

  &:hover {
    color: ${$teal};
  }
`
const OptionsPrivacyLegal = styled.a`
  color: ${$darksmoke};
  display: block;
  margin: 10px 0 0;

  &:hover {
    color: ${$teal};
  }
`
const OptionsSectionMain = styled.div`
  color: ${(props) => (props.darkMode ? $gray : $darksmoke)};
  display: block;
  font-size: 16px;
  width: 370px;

  .sectionContentFull & {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }
  @media (min-width: 320px) and (max-width: 767px) {
    width: 100%;
  }
`
const OptionsBlockCopy = styled.div`
  display: block;
  font-weight: 600;
  margin-top: 15px;
`
const OptionsInfo = styled.div`
  font-size: 0.8em;
  margin-top: 10px;
`
const OptionsSaveServicesList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  & > li {
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`
const OptionsQuestionsList = styled.ul`
  line-height: 1.5em;
  list-style-type: none;
  margin: 0;
  padding: 0;

  a {
    color: ${$darksmoke};
    padding: 5px 0;
    text-transform: lowercase;

    &:hover {
      color: ${$teal};
    }
  }
`
const OptionsFooter = styled.footer`
  color: ${$darksmoke};
  display: block;
  font-size: 14px;
  font-weight: 300;
  margin-top: 40px;
  text-align: center;
`

class OptionsApp extends Component {
  state = {
    on_save_recommendations: getBool(getSetting('on_save_recommendations')),
    sites_twitter: getBool(getSetting('sites_twitter')),
    darkMode: getBool(getSetting('darkMode')),
    access_token: getSetting('access_token'),
    username: getSetting('username')
  }

  userData = () => {
    const { access_token, username } = this.state
    return access_token && username ? this.loggedIn(username) : this.loggedOut()
  }

  loggedIn = (username) => {
    return (
      <div>
        {username} &nbsp; ({' '}
        <OptionsButtonLink onClick={() => openTabWithUrl(LOGOUT_URL)}>
          {localize('options_page', 'logout_link')}
        </OptionsButtonLink>{' '}
        )
      </div>
    )
  }

  loggedOut = () => {
    return (
      <OptionsButtonLink onClick={() => openTabWithUrl(AUTH_URL)}>
        {localize('options_page', 'login_link')}
      </OptionsButtonLink>
    )
  }

  toggleTwitter = () => {
    this.setState(
      (state) => ({
        sites_twitter: !state.sites_twitter
      }),
      () => {
        sendMessage({
          type: TOGGLE_TWITTER,
          payload: { isEnabled: this.state.sites_twitter }
        })
      }
    )
  }
  toggleRecommendations = () => {
    this.setState(
      (state) => ({
        on_save_recommendations: !state.on_save_recommendations
      }),
      () => {
        sendMessage({
          type: TOGGLE_ON_SAVE_RECS,
          payload: { isEnabled: this.state.on_save_recommendations }
        })
      }
    )
  }

  setShortcuts = () => openTabWithUrl(SET_SHORTCUTS)

  render() {
    const { on_save_recommendations, sites_twitter, darkMode } = this.state

    return (
      <OptionsContainer>
        <OptionsTitle darkMode={darkMode}>
          {PocketLogo({
            width: '26px',
            height: '26px',
            marginRight: '10px',
            marginTop: '3px',
            verticalAlign: 'text-top'
          })}
          {localize('options_page', 'header')} -{' '}
          {localize('options_page', 'save_to_pocket')}
        </OptionsTitle>

        <OptionsSection>
          <OptionsSectionContent>
            <OptionsSectionTitle>
              {localize('options_page', 'login_title')}
            </OptionsSectionTitle>
            <OptionsSectionMain>{this.userData()}</OptionsSectionMain>
          </OptionsSectionContent>
        </OptionsSection>

        <OptionsSection>
          <OptionsSectionContent>
            <OptionsSectionTitle>
              {localize('options_page', 'keyboard_shortcut_title')}
            </OptionsSectionTitle>
            <OptionsSectionMain>
              <OptionsButtonLink onClick={this.setShortcuts}>
                {localize('options_page', 'record_shortcut')}
              </OptionsButtonLink>
            </OptionsSectionMain>
          </OptionsSectionContent>
        </OptionsSection>

        <OptionsSection>
          <OptionsSectionContent>
            <OptionsSectionTitle>
              {localize('options_page', 'quick_save_services_title')}
            </OptionsSectionTitle>
            <OptionsSectionMain>
              <OptionsSaveServicesList>
                <li>
                  <Toggle active={sites_twitter} action={this.toggleTwitter} />
                  Twitter
                </li>
              </OptionsSaveServicesList>
              <OptionsInfo>
                {localize('options_page', 'services_info')}
              </OptionsInfo>
            </OptionsSectionMain>
          </OptionsSectionContent>
        </OptionsSection>

        <OptionsSection>
          <OptionsSectionContent>
            <OptionsSectionTitle>
              {localize('options_page', 'recommendations_title')}
            </OptionsSectionTitle>
            <OptionsSectionMain>
              <Toggle
                active={on_save_recommendations}
                action={this.toggleRecommendations}
              />
              <OptionsInfo>
                {localize('options_page', 'recommendations_detail')}
              </OptionsInfo>
            </OptionsSectionMain>
          </OptionsSectionContent>
        </OptionsSection>

        <OptionsSection>
          <OptionsSectionContent>
            <OptionsSectionTitle>
              {localize('options_page', 'questions_pocket_title')}
            </OptionsSectionTitle>
            <OptionsSectionMain>
              <OptionsQuestionsList>
                <li>
                  <a href="https://help.getpocket.com">
                    {localize('options_page', 'search_support_link')}
                  </a>
                </li>
                <li>
                  <a href="https://getpocket.com/extension/support">
                    {localize('options_page', 'send_us_an_email_link')}
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/intent/tweet?screen_name=pocketsupport&text=%23chrome">
                    {localize('options_page', 'get_in_touch_on_twitter_link')}
                  </a>
                </li>
              </OptionsQuestionsList>
            </OptionsSectionMain>
          </OptionsSectionContent>
        </OptionsSection>

        <OptionsSection>
          <OptionsSectionContentFull className="sectionContentFull">
            <OptionsSectionTitle>
              {localize('options_page', 'more_ways_to_save_title')}
            </OptionsSectionTitle>
            <OptionsSectionMain>
              <OptionsContentFullBlock
                href="https://chrome.google.com/webstore/detail/pocket-new-tab/mlnnopicjonfamklpcdfnbcomdlopmof?authuser=1"
                rel="noopener noreferrer"
                target="_blank">
                {PocketNewtab({
                  width: '48px',
                  height: '48px',
                  marginRight: 0
                })}
                <OptionsBlockCopy darkMode={darkMode}>
                  Pocket New Tab
                </OptionsBlockCopy>
              </OptionsContentFullBlock>
              <OptionsContentFullBlock
                href="http://getpocket.com/android/"
                rel="noopener noreferrer"
                target="_blank">
                {AndroidLogo({
                  width: '48px',
                  height: '48px',
                  marginRight: 0
                })}
                <OptionsBlockCopy darkMode={darkMode}>Android</OptionsBlockCopy>
              </OptionsContentFullBlock>
              <OptionsContentFullBlock
                href="http://getpocket.com/iphone/"
                rel="noopener noreferrer"
                target="_blank">
                {IphoneIpad({
                  width: '48px',
                  height: '48px',
                  marginRight: 0
                })}
                <OptionsBlockCopy darkMode={darkMode}>
                  iPhone/Ipad
                </OptionsBlockCopy>
              </OptionsContentFullBlock>
              <OptionsContentFullBlock
                href="http://getpocket.com/mac/"
                rel="noopener noreferrer"
                target="_blank">
                {Mac({
                  width: '48px',
                  height: '48px',
                  marginRight: 0
                })}
                <OptionsBlockCopy darkMode={darkMode}>Mac</OptionsBlockCopy>
              </OptionsContentFullBlock>
            </OptionsSectionMain>
          </OptionsSectionContentFull>
        </OptionsSection>

        <OptionsFooter>
          &copy; Copyright {new Date().getFullYear()} Read It Later Inc.
          <OptionsPrivacyLegal
            href="https://getpocket.com/legal?src=extensions"
            rel="noopener noreferrer"
            target="_blank">
            Legal &amp; Privacy
          </OptionsPrivacyLegal>
        </OptionsFooter>
      </OptionsContainer>
    )
  }
}

const root = document.getElementById('pocket-extension-anchor')

ReactDOM.render(<OptionsApp />, root)
