import ReactDOM from 'react-dom'
import React, { useEffect, useState } from 'react'
import { css, cx } from 'linaria'
import { openTabWithUrl } from 'common/interface'
import { localize } from 'common/_locales/locales'
import { AUTH_URL, LOGOUT_URL, SET_SHORTCUTS } from 'common/constants'
import { COLORS } from '../../components/colors/colors'
import { getSetting } from 'common/interface'
import { COLOR_MODE_CHANGE } from 'actions'
import { getOSModeClass } from 'common/helpers'
import { Logo } from 'components/logo/logo'
import { FacebookIcon } from 'components/icons/icons'
import { TwitterIcon } from 'components/icons/icons'
import { PocketLogoIcon } from 'components/icons/icons'

const {
  $pitch,
  $snow,
  $darksmoke,
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
`
const optionsSection = css`
  align-items: center;
  border-top: 1px solid ${$snow};
  display: flex;
  font-size: 14px;
  justify-content: flex-start;
  padding: 20px 0;
  text-align: left;

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
`
const optionsSectionContent = css`
  display: flex;
`
const optionsSectionMain = css`
  color: ${$darksmoke};
  display: block;
  font-size: 16px;
  width: 370px;

  @media (min-width: 320px) and (max-width: 767px) {
    width: 100%;
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
  const [storedTheme, setStoredTheme] = useState('light')
  const [pageTheme, setPageTheme] = useState('light')
  const [accessToken, setAccessToken] = useState()
  const [userName, setUserName] = useState()

  useEffect(async () => {
    updateTheme(await getSetting('theme'))
    setAccessToken(await getSetting('access_token'))
    setUserName(await getSetting('username'))
  }, [])

  const setShortcuts = () => openTabWithUrl(SET_SHORTCUTS)
  const logoutAction = () => openTabWithUrl(LOGOUT_URL)
  const loginAction = () => openTabWithUrl(AUTH_URL)

  const updateTheme = (mode) => {
    chrome.runtime.sendMessage({ type: COLOR_MODE_CHANGE, payload: { theme: mode } })
    const newTheme = (mode === 'system') ? getOSModeClass() : mode
    setStoredTheme(mode)
    setPageTheme(newTheme)
  }

  return (
    <div className={cx(optionsContainer, `pocket-theme-${pageTheme}`)}>
      <Logo />
      <h1 className={cx(optionsTitle)}>
        {localize('options', 'header')}
      </h1>

      <div className={optionsSection}>
        <div className={optionsSectionContent}>
          <div className={optionsSectionTitle}>
            {localize('options', 'login_title')}
          </div>
          <div className={optionsSectionMain}>
            {(accessToken && userName) ? (
              <div>
                {userName} &nbsp; ({' '}
                <button className={optionsButtonLink} onClick={logoutAction}>
                  {localize('options', 'log_out')}
                </button>{' '})
              </div>
            ) : (
              <button className={optionsButtonLink} onClick={loginAction}>
                {localize('options', 'log_in')}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className={optionsSection}>
        <div className={optionsSectionContent}>
          <div className={optionsSectionTitle}>
            {localize('options', 'shortcut_title')}
          </div>
          <div className={optionsSectionMain}>
            <button className={optionsButtonLink} onClick={setShortcuts}>
              {localize('options', 'shortcut_record')}
            </button>
          </div>
        </div>
      </div>

      <div className={optionsSection}>
        <div className={optionsSectionContent}>
          <div className={cx(optionsSectionTitle)}>
            {localize('options', 'theme_title')}
          </div>
          <div className={cx(optionsSectionMain)}>
            <div>
              <input
                id="light"
                type="radio"
                name="light"
                onChange={() => updateTheme('light')}
                checked={storedTheme === 'light'}
              />
              <label htmlFor="light">{localize('options', 'theme_light')}</label>
            </div>
            <div>
              <input
                id="dark"
                type="radio"
                name="dark"
                onChange={() => updateTheme('dark')}
                checked={storedTheme === 'dark'}
              />
              <label htmlFor="dark">{localize('options', 'theme_dark')}</label>
            </div>
            <div>
              <input
                id="system"
                type="radio"
                name="system"
                onChange={() => updateTheme('system')}
                checked={storedTheme === 'system'}
              />
              <label htmlFor="system">{localize('options', 'theme_system')}</label>
            </div>
          </div>
        </div>
      </div>

      <div className={optionsSection}>
        <div className={optionsSectionContent}>
          <div className={optionsSectionTitle}>
            {localize('options', 'app_title')}
          </div>
          <div className={optionsSectionMain}>
            <a
              href="https://apps.apple.com/us/app/pocket-save-read-grow/id309601447"
              target="_blank"
              rel="noopener noreferrer">
              <img
                src="https://assets.getpocket.com/web-ui/assets/apple-app-store-badge.2928664fe1fc6aca88583a6f606d60ba.svg"
                alt={localize('options', 'app_apple')}
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.ideashower.readitlater.pro"
              target="_blank"
              rel="noopener noreferrer">
              <img
                src="https://assets.getpocket.com/web-ui/assets/google-play-badge.db9b21a1c41f3dcd9731e1e7acfdbb57.png"
                alt={localize('options', 'app_google')}
              />
            </a>
          </div>
        </div>
      </div>

      <footer className={optionsFooter}>
        <a
          href="https://help.getpocket.com/"
          target="_blank"
          rel="noopener noreferrer">
          {localize('options', 'need_help')}
        </a>

        <a
          href="https://getpocket.com/contact_support?field3=Question%20about%20Pocket%20Extension"
          target="_blank"
          rel="noopener noreferrer">
          {localize('options', 'email_us')}
        </a>

        <div>
          {localize('options', 'follow')}
          <FacebookIcon />
          <TwitterIcon />
        </div>

        <PocketLogoIcon />
        <p dangerouslySetInnerHTML={{ __html: localize('options', 'family').replace('Mozilla', '<a href="https://mozilla.org/about/" rel="noopener noreferrer" target="_blank">Mozilla</a>')}}></p>

        <p>&copy; {new Date().getFullYear()} Read It Later, Inc.</p>

        <a
          href='https://getpocket.com/privacy/?src=extension'
          rel='noopener noreferrer'
          target='_blank'>
          {localize('options', 'privacy')}
        </a>
        <a
          href='https://getpocket.com/tos/?src=extension'
          rel='noopener noreferrer'
          target='_blank'>
          {localize('options', 'terms')}
        </a>
      </footer>
    </div>
  )
}

const root = document.getElementById('pocket-extension-anchor')

ReactDOM.render(<OptionsApp />, root)
