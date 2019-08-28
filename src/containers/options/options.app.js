import styles from './options.scss'
import {
  PocketLogo,
  PocketNewtab,
  AndroidLogo,
  IphoneIpad,
  Mac
} from 'components/icons'
import Toggle from 'components/toggle/toggle'
import React, { Component } from 'react'
import { openTabWithUrl } from 'common/interface'
import { localize } from 'common/_locales/locales'
import { AUTH_URL, LOGOUT_URL, SET_SHORTCUTS } from 'common/constants'

export default class Options extends Component {
  userData = () => {
    const setup = this.props.setup
    return setup.oauth_token && setup.account_username
      ? this.loggedIn(setup.account_username)
      : this.loggedOut()
  }

  loggedIn = username => {
    return (
      <div>
        {username} &nbsp; ({' '}
        <button
          className={styles.buttonLink}
          onClick={() => openTabWithUrl(LOGOUT_URL)}>
          {localize('options_page', 'logout_link')}
        </button>{' '}
        )
      </div>
    )
  }

  loggedOut = () => {
    return (
      <button
        className={styles.buttonLink}
        onClick={() => openTabWithUrl(AUTH_URL)}>
        {localize('options_page', 'login_link')}
      </button>
    )
  }

  toggleTwitter = () => this.props.toggleSite('sites_twitter')

  setShortcuts = () => openTabWithUrl(SET_SHORTCUTS)

  render() {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>
          {PocketLogo({
            width: '26px',
            height: '26px',
            marginRight: '10px',
            marginTop: '3px',
            verticalAlign: 'text-top'
          })}
          {localize('options_page', 'header')} -{' '}
          {localize('options_page', 'save_to_pocket')}
        </h1>

        <div className={styles.section}>
          <div className={styles.sectionContent}>
            <div className={styles.sectionTitle}>
              {localize('options_page', 'login_title')}
            </div>
            <div className={styles.sectionMain}>{this.userData()}</div>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionContent}>
            <div className={styles.sectionTitle}>
              {localize('options_page', 'keyboard_shortcut_title')}
            </div>
            <div className={styles.sectionMain}>
              <button className={styles.buttonLink} onClick={this.setShortcuts}>
                {localize('options_page', 'record_shortcut')}
              </button>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionContent}>
            <div className={styles.sectionTitle}>
              {localize('options_page', 'quick_save_services_title')}
            </div>
            <div className={styles.sectionMain}>
              <ul className={styles.saveServices}>
                <li>
                  <Toggle
                    active={this.props.setup.sites_twitter}
                    action={this.toggleTwitter}
                  />
                  Twitter
                </li>
              </ul>
              <div className={styles.info}>
                {localize('options_page', 'services_info')}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionContent}>
            <div className={styles.sectionTitle}>
              {localize('options_page', 'recommendations_title')}
            </div>
            <div className={styles.sectionMain}>
              <Toggle
                active={this.props.setup.on_save_recommendations}
                action={this.props.toggleRecommendations}
              />
              <div className={styles.info}>
                {localize('options_page', 'recommendations_detail')}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionContent}>
            <div className={styles.sectionTitle}>
              {localize('options_page', 'questions_pocket_title')}
            </div>
            <div className={styles.sectionMain}>
              <ul className={styles.questions}>
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

        <div className={styles.section}>
          <div className={styles.sectionContentFull}>
            <div className={styles.sectionTitle}>
              {localize('options_page', 'more_ways_to_save_title')}
            </div>
            <div className={styles.sectionMain}>
              <a
                className={styles.contentFullBlock}
                href="https://chrome.google.com/webstore/detail/pocket-new-tab/mlnnopicjonfamklpcdfnbcomdlopmof?authuser=1"
                rel="noopener noreferrer"
                target="_blank">
                {PocketNewtab({
                  width: '48px',
                  height: '48px',
                  marginRight: 0
                })}
                <div className={styles.blockCopy}>Pocket New Tab</div>
              </a>
              <a
                className={styles.contentFullBlock}
                href="http://getpocket.com/android/"
                rel="noopener noreferrer"
                target="_blank">
                {AndroidLogo({
                  width: '48px',
                  height: '48px',
                  marginRight: 0
                })}
                <div className={styles.blockCopy}>Android</div>
              </a>
              <a
                className={styles.contentFullBlock}
                href="http://getpocket.com/iphone/"
                rel="noopener noreferrer"
                target="_blank">
                {IphoneIpad({
                  width: '48px',
                  height: '48px',
                  marginRight: 0
                })}
                <div className={styles.blockCopy}>iPhone/Ipad</div>
              </a>
              <a
                className={styles.contentFullBlock}
                href="http://getpocket.com/mac/"
                rel="noopener noreferrer"
                target="_blank">
                {Mac({
                  width: '48px',
                  height: '48px',
                  marginRight: 0
                })}
                <div className={styles.blockCopy}>Mac</div>
              </a>
            </div>
          </div>
        </div>

        <footer className={styles.footer}>
          &copy; Copyright {new Date().getFullYear()} Read It Later Inc.
          <a
            className={styles.privacylegal}
            href="https://getpocket.com/legal?src=extensions"
            rel="noopener noreferrer"
            target="_blank">
            Legal &amp; Privacy
          </a>
        </footer>
      </div>
    )
  }
}
