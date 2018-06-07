import React from 'react'
import Toggle from 'Elements/Toggle/toggle'
import { localize } from 'Common/_locales/locales'
import { SectionBlock } from './options'

export class RecsBlock extends React.Component {
  toggleRecs = () => this.props.toggleRecs()

  render() {
    return (
      <SectionBlock>
        <div className="sectionTitle">
          {localize('options_page', 'recommendations_title')}
        </div>
        <div className="sectionBody">
          <Toggle active={false} action={this.toggleRecommendations} />
          <div className="sectionCopy">
            {localize('options_page', 'recommendations_detail')}
          </div>
        </div>
      </SectionBlock>
    )
  }
}
