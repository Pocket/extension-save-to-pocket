import React from 'react'
import { AUTH_URL, LOGOUT_URL } from 'Common/constants'
import { localize } from 'Common/_locales/locales'
import { openTabWithUrl } from 'Common/interface'
import { ButtonLink } from 'Elements/Buttons/button'
import { SectionBlock } from './options'

export class AccountBlock extends React.Component {
  logOut = () => openTabWithUrl(LOGOUT_URL)
  logIn = () => openTabWithUrl(AUTH_URL)

  userData = () => {
    const { oauth_token, account_username } = this.props
    return oauth_token && account_username
      ? this.loggedIn(account_username)
      : this.loggedOut()
  }

  loggedIn = username => {
    return (
      <div>
        {username} &nbsp; (<ButtonLink onClick={this.logOut}>
          {localize('options_page', 'logout_link')}
        </ButtonLink>)
      </div>
    )
  }

  loggedOut = () => {
    return (
      <ButtonLink onClick={this.logIn}>
        {localize('options_page', 'login_link')}
      </ButtonLink>
    )
  }
  render() {
    return (
      <SectionBlock>
        <div className="sectionTitle">
          {localize('options_page', 'login_title')}
        </div>
        <div className="sectionBody">{this.userData()}</div>
      </SectionBlock>
    )
  }
}
