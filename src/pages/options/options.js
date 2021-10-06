import ReactDOM from 'react-dom'
import React, { useEffect, useState } from 'react'
import { css, cx } from 'linaria'
import { openTabWithUrl } from 'common/interface'
import { localize } from 'common/_locales/locales'
import { AUTH_URL, LOGOUT_URL, SET_SHORTCUTS } from 'common/constants'
import { getSetting } from 'common/interface'
import { COLOR_MODE_CHANGE } from 'actions'
import { getOSModeClass } from 'common/helpers'
import { Logo } from 'components/logo/logo'
import { Button } from 'components/button/button'
import { FacebookIcon } from 'components/icons/icons'
import { TwitterIcon } from 'components/icons/icons'
import { PocketLogoIcon } from 'components/icons/icons'
import { GlobalVariables } from '../injector/globalStyles'

const optionsContainer = css`
  ${GlobalVariables};
  background-color: var(--color-canvas);
  box-sizing: border-box;
  display: inline-block;
  padding: 0 30px;
  width: 100vw;
  height: 100vh;

  a {
    color: var(--color-textPrimary);
    text-decoration: underline;
  }
`
const optionsWrapper = css`
  max-width: 550px;
  margin: 0 auto;
  padding: 100px 0;
`
const optionsTitle = css`
  color: var(--color-textPrimary);
  font-size: 33px;
  line-height: 40px;
  font-weight: 600;
  margin: 10px 0 15px 0;
`
const optionsHeader = css`
  border-bottom: 1px solid var(--color-dividerPrimary);
  margin-bottom: 20px;
`
const optionsSectionTitle = css`
  color: var(--color-textPrimary);
  display: block;
  font-size: 16px;
  width: 180px;
  padding: 20px 0;
  display: flex;
  align-items: center;
  /* @media (min-width: 320px) and (max-width: 767px) {
    margin-bottom: 20px;
    width: 100%;
  } */
`
const optionsSectionContent = css`
  display: flex;
`
const optionsSectionMain = css`
  color: var(--color-textPrimary);
  display: block;
  font-size: 16px;
  width: 370px;
  padding: 20px 0;
/* 
  @media (min-width: 320px) and (max-width: 767px) {
    width: 100%;
  } */
`
const appIcon = css`
  max-height: 40px;

  &.google-badge {
    margin: -10px 0 0 -10px;
    max-height: 60px;
  }
`
const optionsFooter = css`
  color: var(--color-textPrimary);
  font-size: 16px;
  margin-top: 40px;
`
const links = css`
  display: flex;
  justify-content: space-between;
  margin-right: 100px;
`
const follow = css`
  display: flex;
  flex-direction: column;
`
const followIcons = css`
  margin-top: 20px;

  .icon {
    width: 25px;
    height: 25px;
    color: var(--color-textPrimary);
  }

  a + a  {
    margin-left: 20px;
  }
`
const copyright = css`
  display: flex;
  align-items: center;
  margin-top: 40px;

  .icon {
    height: 25px;
    margin-right: 20px;
  }

  span,
  a {
    margin-right: 15px; 

    &:last-child {
      margin-right: 0;
    }
  }

  p {
    margin-top: 0;
    margin-bottom: 10px;
  }
`

const OptionsApp = () => {
  const [storedTheme, setStoredTheme] = useState('light')
  const [pageTheme, setPageTheme] = useState('light')
  const [accessToken, setAccessToken] = useState()
  const [userName, setUserName] = useState()

  useEffect(async () => {
    updateTheme(await getSetting('theme') || 'light')
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
      <section className={optionsWrapper}>
        <div className={optionsHeader}>
          <Logo />
          <h1 className={cx(optionsTitle)}>
            {localize('options', 'header')}
          </h1>
        </div>

        <div className={optionsSectionContent}>
          <div className={optionsSectionTitle}>
            {localize('options', 'login_title')}
          </div>
          <div className={optionsSectionMain}>
            {(accessToken && userName) ? (
              <div>
                {userName}
                <Button type='secondary' onClick={logoutAction}>
                  {localize('options', 'log_out')}
                </Button>
              </div>
            ) : (
              <Button type='secondary' onClick={loginAction}>
                {localize('options', 'log_in')}
              </Button>
            )}
          </div>
        </div>

        <div className={optionsSectionContent}>
          <div className={optionsSectionTitle}>
            {localize('options', 'shortcut_title')}
          </div>
          <div className={optionsSectionMain}>
            <Button type='primary' onClick={setShortcuts}>
              {localize('options', 'shortcut_record')}
            </Button>
          </div>
        </div>

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
                className={appIcon}
                src="https://assets.getpocket.com/web-ui/assets/apple-app-store-badge.2928664fe1fc6aca88583a6f606d60ba.svg"
                alt={localize('options', 'app_apple')}
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.ideashower.readitlater.pro"
              target="_blank"
              rel="noopener noreferrer">
              <img
                className={cx(appIcon, 'google-badge')}
                src="https://assets.getpocket.com/web-ui/assets/google-play-badge.db9b21a1c41f3dcd9731e1e7acfdbb57.png"
                alt={localize('options', 'app_google')}
              />
            </a>
          </div>
        </div>
        <footer className={optionsFooter}>
          <div className={links}>
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
            <div className={follow}>
              {localize('options', 'follow')}
              <div className={followIcons}>
                <a 
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.facebook.com/pocket/">
                  <FacebookIcon />
                </a>
                <a 
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://twitter.com/pocket">
                  <TwitterIcon />
                </a>
              </div>
            </div>
          </div>

          <div className={copyright}>
            <PocketLogoIcon />
            <div>
              <p dangerouslySetInnerHTML={{ __html: localize('options', 'family').replace('Mozilla', '<a href="https://mozilla.org/about/" rel="noopener noreferrer" target="_blank">Mozilla</a>')}}></p>
              <div>
                <span>&copy; {new Date().getFullYear()} Read It Later, Inc.</span>
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
              </div>
            </div>
          </div>
        </footer>
      </section>
    </div>
  )
}

const root = document.getElementById('pocket-extension-anchor')

ReactDOM.render(<OptionsApp />, root)
