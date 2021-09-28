import ReactDOM from 'react-dom'
import React, { useState } from 'react'
import { css, cx } from 'linaria'
import Toggle from '../../components/toggle/toggle'
import { getBool } from 'common/utilities'
import { openTabWithUrl } from 'common/interface'
import { localize } from 'common/_locales/locales'
import { AUTH_URL, LOGOUT_URL, SET_SHORTCUTS } from 'common/constants'
import { COLORS } from '../../components/colors/colors'
import { getSetting } from 'common/interface'
import { sendMessage } from 'common/interface'
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

const optionsButtonLink = css`
  color: ${$coal};
  text-decoration: underline;

  &:hover {
    color: ${$emerald};
  }
`
const optionsContainer = css`
  box-sizing: border-box;
  display: inline-block;
  margin-bottom: 80px;
  padding: 0 30px;
  width: 700px;

  @media (min-width: 320px) and (max-width: 767px) {
    width: 100%;
  }
`
const optionsTitle = css`
  color: ${$pitch};
  font-size: 28px;
  font-weight: 300;
  margin: 70px 0 0;
  padding: 0 0 20px;
  text-align: left;

  &.darkMode {
    color: ${$gray};
  }
`
const optionsSection = css`
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
const optionsSectionTitle = css`
  color: $darksmoke;
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

  &.darkMode {
    color: ${$gray};
  }
`
const optionsSectionContent = css`
  display: flex;
`
const optionsSectionContentFull = css`
  display: block;
  width: 100%;
`
const optionsContentFullBlock = css`
  color: ${$darksmoke};
  display: block;
  margin: 20px 0 10px;
  text-align: center;

  &:hover {
    color: ${$teal};
  }
`
const optionsPrivacyLegal = css`
  color: ${$darksmoke};
  display: block;
  margin: 10px 0 0;

  &:hover {
    color: ${$teal};
  }
`
const optionsSectionMain = css`
  color: ${$darksmoke};
  display: block;
  font-size: 16px;
  width: 370px;

  &.darkMode {
    color: ${$gray};
  }

  .sectionContentFull & {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }

  @media (min-width: 320px) and (max-width: 767px) {
    width: 100%;
  }
`
const optionsBlockCopy = css`
  display: block;
  font-weight: 600;
  margin-top: 15px;
`
const optionsInfo = css`
  font-size: 0.8em;
  margin-top: 10px;
`
const optionsSaveServicesList = css`
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
const optionsQuestionsList = css`
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
const optionsFooter = css`
  color: ${$darksmoke};
  display: block;
  font-size: 14px;
  font-weight: 300;
  margin-top: 40px;
  text-align: center;
`

const OptionsApp = () => {
  const [sitesTwitter, setSitesTwitter] = useState(getBool(getSetting('sites_twitter')))
  const [darkMode] = useState(getBool(getSetting('darkMode')))
  // const [accessToken] = useState(getSetting('access_token'))
  // const [userName] = useState(getSetting('username'))

  const toggleTwitter = () => {
    setSitesTwitter(!sitesTwitter)
    const payload = { isEnabled: !sitesTwitter}
    sendMessage({ type: TOGGLE_TWITTER, payload })
  }

  const setShortcuts = () => openTabWithUrl(SET_SHORTCUTS)
  const logoutAction = () => openTabWithUrl(LOGOUT_URL)
  const loginAction = () => openTabWithUrl(AUTH_URL)

  return (
    <div className={optionsContainer}>
      <h1 className={cx(optionsTitle, darkMode ? 'darkMode' : null)}>
        {localize('options_page', 'header')} -{' '}
        {localize('options_page', 'save_to_pocket')}
      </h1>

      <div className={optionsSection}>
        <div className={optionsSectionContent}>
          <div className={cx(optionsSectionTitle, darkMode ? 'darkMode' : null)}>
            {localize('options_page', 'login_title')}
          </div>
          <div className={cx(optionsSectionMain, darkMode ? 'darkMode' : null)}>
            TODO: fix accessToken & userName stuff here
            {/* {(accessToken && userName) ? (
              <div>
                {userName} &nbsp; ({' '}
                <button className={optionsButtonLink} onClick={logoutAction}>
                  {localize('options_page', 'logout_link')}
                </button>{' '})
              </div>
            ) : (
              <button className={optionsButtonLink} onClick={loginAction}>
                {localize('options_page', 'login_link')}
              </button>
            )} */}
          </div>
        </div>
      </div>

      <div className={optionsSection}>
        <div className={optionsSectionContent}>
          <div className={cx(optionsSectionTitle, darkMode ? 'darkMode' : null)}>
            {localize('options_page', 'keyboard_shortcut_title')}
          </div>
          <div className={cx(optionsSectionMain, darkMode ? 'darkMode' : null)}>
            <button className={optionsButtonLink} onClick={setShortcuts}>
              {localize('options_page', 'record_shortcut')}
            </button>
          </div>
        </div>
      </div>

      <div className={optionsSection}>
        <div className={optionsSectionContent}>
          <div className={cx(optionsSectionTitle, darkMode ? 'darkMode' : null)}>
            {localize('options_page', 'quick_save_services_title')}
          </div>
          <div className={cx(optionsSectionMain, darkMode ? 'darkMode' : null)}>
            <ul className={optionsSaveServicesList}>
              <li>
                <Toggle active={sitesTwitter} action={toggleTwitter} />
                Toggle Twitter
              </li>
            </ul>
            <div className={optionsInfo}>
              {localize('options_page', 'services_info')}
            </div>
          </div>
        </div>
      </div>

      <div className={optionsSection}>
        <div className={optionsSectionContent}>
          <div className={cx(optionsSectionTitle, darkMode ? 'darkMode' : null)}>
            {localize('options_page', 'questions_pocket_title')}
          </div>
          <div className={cx(optionsSectionMain, darkMode ? 'darkMode' : null)}>
            <ul className={optionsQuestionsList}>
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
            </ul>
          </div>
        </div>
      </div>

      <div className={optionsSection}>
        <div className={cx(optionsSectionContentFull, '.sectionContentFull')}>
          <div className={cx(optionsSectionTitle, darkMode ? 'darkMode' : null)}>
            {localize('options_page', 'more_ways_to_save_title')}
          </div>
          <div className={cx(optionsSectionMain, darkMode ? 'darkMode' : null)}>
            <a
              className={optionsContentFullBlock}
              href="https://chrome.google.com/webstore/detail/pocket-new-tab/mlnnopicjonfamklpcdfnbcomdlopmof?authuser=1"
              rel="noopener noreferrer"
              target="_blank">
              <div className={optionsBlockCopy}>
                Pocket New Tab
              </div>
            </a>
            <a
              className={optionsContentFullBlock}
              href="http://getpocket.com/android/"
              rel="noopener noreferrer"
              target="_blank">
              <div className={optionsBlockCopy}>
                Android
              </div>
            </a>
            <a
              className={optionsContentFullBlock}
              href="http://getpocket.com/iphone/"
              rel="noopener noreferrer"
              target="_blank">
              <div className={optionsBlockCopy}>
                iPhone/iPad
              </div>
            </a>
            <a
              className={optionsContentFullBlock}
              href="http://getpocket.com/mac/"
              rel="noopener noreferrer"
              target="_blank">
              <div className={optionsBlockCopy}>
                Mac
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* NOTE: Add some localizations here */}
      <footer className={optionsFooter}>
        &copy; Copyright {new Date().getFullYear()} Read It Later Inc.
        <a
          className={optionsPrivacyLegal}
          href="https://getpocket.com/legal?src=extensions"
          rel="noopener noreferrer"
          target="_blank">
          Legal &amp; Privacy
        </a>
      </footer>
    </div>
  )
}

const root = document.getElementById('pocket-extension-anchor')

ReactDOM.render(<OptionsApp />, root)
