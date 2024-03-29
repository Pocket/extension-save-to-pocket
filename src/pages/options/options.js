import ReactDOM from 'react-dom'
import React, { useEffect, useState } from 'react'
import { css, cx } from 'linaria'
import { openTabWithUrl } from 'common/interface'
import { AUTH_URL, LOGOUT_URL, SET_SHORTCUTS } from 'common/constants'
import { getSetting } from 'common/interface'
import { COLOR_MODE_CHANGE } from 'actions'
import { getOSModeClass } from 'common/helpers'
import { Logo } from 'components/logo/logo'
import { Button } from 'components/button/extensions-button'
import { FacebookIcon } from 'components/icons/icons'
import { TwitterIcon } from 'components/icons/icons'
import { InstagramIcon } from 'components/icons/icons'
import { PocketLogoIcon } from 'components/icons/icons'
import { radioStyles } from '../injector/globalStyles'

const container = css`
  color: var(--color-textPrimary);
  font-size: 16px;
  width: 100vw;
  height: 100vh;

  a {
    color: var(--color-textPrimary);
    text-decoration: underline;
    display: inline-block;
  }
`
const wrapper = css`
  max-width: 550px;
  margin: 0 auto;
  padding: 100px 20px;
`
const title = css`
  font-size: 33px;
  line-height: 40px;
  font-weight: 600;
  margin: 10px 0 15px 0;
`
const header = css`
  border-bottom: 1px solid var(--color-dividerPrimary);
  margin-bottom: 20px;
`
const user = css`
  margin-right: 10px;
  margin-bottom: 10px;
  display: inline-block;
`
const section = css`
  display: flex;
  padding: 20px 0;

  @media (max-width: 599px) {
    flex-direction: column;
  }
`
const sectionLabel = css`
  display: flex;
  align-items: center;
  flex: 1;
  font-weight: 500;
`
const sectionAction = css`
  flex: 2;

  @media (max-width: 599px) {
    margin: 10px 0 0 20px;
  }
`
const appIcon = css`
  max-height: 40px;
`
const google = css`
  margin-left: 10px;
  height: 40px;
  overflow: hidden;

  img {
    margin: -10px 0 0 -10px;
    max-height: 60px;
  }
`
const footer = css`
  font-size: 16px;
  margin-top: 40px;
`
const footerLinks = css`
  display: flex;
  justify-content: space-between;
  margin-right: 100px;

  @media (max-width: 479px) {
    margin-right: 0;
  }
`
const footerFollow = css`
  display: flex;
  flex-direction: column;
`
const footerFollowIcons = css`
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
const footerCopyright = css`
  display: flex;
  align-items: center;
  margin-top: 40px;

  @media (max-width: 599px) {
    flex-direction: column;
    align-items: flex-start;

    .icon {
      margin-bottom: 10px;
    }
  }

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
  const [accessToken, setAccessToken] = useState()
  const [userName, setUserName] = useState()

  useEffect(async () => {
    updateTheme(await getSetting('theme') || 'system')
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

    const htmlTag = document && document.documentElement
    htmlTag?.classList.toggle(`pocket-theme-light`, newTheme === 'light')
    htmlTag?.classList.toggle(`pocket-theme-dark`, newTheme === 'dark')
  }

  return (
    <div className={cx('pocket-extension', radioStyles, container)}>
      <section className={wrapper}>
        <header className={header}>
          <Logo />
          <h1 className={title}>
            {chrome.i18n.getMessage('options_header')}
          </h1>
        </header>

        <div className={section}>
          <div className={sectionLabel}>
            {chrome.i18n.getMessage('options_login_title')}
          </div>
          <div className={sectionAction}>
            {(accessToken && userName) ? (
              <div>
                <span className={user}>{userName}</span>
                <Button type='secondary' onClick={logoutAction}>
                  {chrome.i18n.getMessage('options_log_out')}
                </Button>
              </div>
            ) : (
              <Button type='secondary' onClick={loginAction}>
                {chrome.i18n.getMessage('options_log_in')}
              </Button>
            )}
          </div>
        </div>

        <div className={section}>
          <div className={sectionLabel}>
            {chrome.i18n.getMessage('options_shortcut_title')}
          </div>
          <div className={sectionAction}>
            <Button type='primary' onClick={setShortcuts}>
              {chrome.i18n.getMessage('options_shortcut_record')}
            </Button>
          </div>
        </div>

        <div className={section}>
          <div className={sectionLabel}>
            {chrome.i18n.getMessage('options_app_title')}
          </div>
          <div className={sectionAction}>
            <a
              href="https://apps.apple.com/us/app/pocket-save-read-grow/id309601447"
              target="_blank"
              rel="noopener noreferrer">
              <img
                className={appIcon}
                src="https://assets.getpocket.com/web-ui/assets/apple-app-store-badge.2928664fe1fc6aca88583a6f606d60ba.svg"
                alt={chrome.i18n.getMessage('options_app_apple')}
              />
            </a>
            <a
              className={google}
              href="https://play.google.com/store/apps/details?id=com.ideashower.readitlater.pro"
              target="_blank"
              rel="noopener noreferrer">
              <img
                className={appIcon}
                src="https://assets.getpocket.com/web-ui/assets/google-play-badge.db9b21a1c41f3dcd9731e1e7acfdbb57.png"
                alt={chrome.i18n.getMessage('options_app_google')}
              />
            </a>
          </div>
        </div>

        <div className={section}>
          <div className={sectionLabel}>
            {chrome.i18n.getMessage('options_theme_title')}
          </div>
          <div className={sectionAction}>
            <div>
              <input
                id="light"
                type="radio"
                name="light"
                onChange={() => updateTheme('light')}
                checked={storedTheme === 'light'}
              />
              <label htmlFor="light">{chrome.i18n.getMessage('options_theme_light')}</label>
            </div>
            <div>
              <input
                id="dark"
                type="radio"
                name="dark"
                onChange={() => updateTheme('dark')}
                checked={storedTheme === 'dark'}
              />
              <label htmlFor="dark">{chrome.i18n.getMessage('options_theme_dark')}</label>
            </div>
            <div>
              <input
                id="system"
                type="radio"
                name="system"
                onChange={() => updateTheme('system')}
                checked={storedTheme === 'system'}
              />
              <label htmlFor="system">{chrome.i18n.getMessage('options_theme_system')}</label>
            </div>
          </div>
        </div>

        <footer className={footer}>
          <div className={footerLinks}>
            <a
              href="https://help.getpocket.com/"
              target="_blank"
              rel="noopener noreferrer">
              {chrome.i18n.getMessage('options_need_help')}
            </a>
            <a
              href="https://getpocket.com/contact_support?field3=Question%20about%20Pocket%20Extension"
              target="_blank"
              rel="noopener noreferrer">
              {chrome.i18n.getMessage('options_email_us')}
            </a>
            <div className={footerFollow}>
              {chrome.i18n.getMessage('options_follow')}
              <div className={footerFollowIcons}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.facebook.com/pocket/">
                  <FacebookIcon />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://twitter.com/pocket/">
                  <TwitterIcon />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.instagram.com/pocket/">
                  <InstagramIcon />
                </a>
              </div>
            </div>
          </div>

          <div className={footerCopyright}>
            <PocketLogoIcon />
            <div>
              <p dangerouslySetInnerHTML={{ __html: chrome.i18n.getMessage('options_family').replace('Mozilla', '<a href="https://mozilla.org/about/" rel="noopener noreferrer" target="_blank">Mozilla</a>')}}></p>
              <div>
                <span>&copy; {new Date().getFullYear()} Read It Later, Inc.</span>
                <a
                  href='https://getpocket.com/privacy/?src=extension'
                  rel='noopener noreferrer'
                  target='_blank'>
                  {chrome.i18n.getMessage('options_privacy')}
                </a>
                <a
                  href='https://getpocket.com/tos/?src=extension'
                  rel='noopener noreferrer'
                  target='_blank'>
                  {chrome.i18n.getMessage('options_terms')}
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
