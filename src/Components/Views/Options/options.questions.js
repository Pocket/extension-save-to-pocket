import React from 'react'
import { localize } from 'Common/_locales/locales'
import { SectionBlock } from './options'
import { openTabWithUrl } from 'Common/interface'
import { ButtonLink } from 'Elements/Buttons/button'

export class QuestionsBlock extends React.Component {
  searchSupport = () => openTabWithUrl('https://help.getpocket.com')
  emailSupport = () => openTabWithUrl('https://getpocket.com/extension/support')
  twitterSupport = () =>
    openTabWithUrl(
      'https://twitter.com/intent/tweet?screen_name=pocketsupport&text=%23chrome'
    )

  render() {
    return (
      <SectionBlock>
        <div className="sectionTitle">
          {localize('options_page', 'questions_pocket_title')}
        </div>
        <div className="sectionBody">
          <ul className="sectionList">
            <li>
              <ButtonLink onClick={this.searchSupport}>
                {localize('options_page', 'search_support_link')}
              </ButtonLink>
            </li>
            <li>
              <ButtonLink onClick={this.emailSupport}>
                {localize('options_page', 'send_us_an_email_link')}
              </ButtonLink>
            </li>
            <li>
              <ButtonLink onClick={this.twitterSupport}>
                {localize('options_page', 'get_in_touch_on_twitter_link')}
              </ButtonLink>
            </li>
          </ul>
        </div>
      </SectionBlock>
    )
  }
}
