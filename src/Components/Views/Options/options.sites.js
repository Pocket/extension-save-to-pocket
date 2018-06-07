import React from 'react'
import Toggle from 'Elements/Toggle/toggle'
import { localize } from 'Common/_locales/locales'
import { SectionBlock } from './options'

export class SitesBlock extends React.Component {
  toggleTwitter = () => this.props.toggleSite('sites_twitter')

  render() {
    return (
      <SectionBlock>
        <div className="sectionTitle">
          {localize('options_page', 'quick_save_services_title')}
        </div>
        <div className="sectionBody">
          <Toggle active={false} action={this.toggleTwitter} />
          Twitter
          <div className="sectionCopy">
            {localize('options_page', 'services_info')}
          </div>
        </div>
      </SectionBlock>
    )
  }
}
