import React from 'react'
import styled from 'react-emotion'

import { PanelBase } from 'Elements/Foundations/foundation'
import { RecommendationList } from './List/list'
import { Header } from './Header/header'

export const PanelWrapper = styled('div')`
  ${PanelBase};
  margin-top: 1.5em;
`

export class RecommendationPanel extends React.Component {
  render() {
    const { loading, items, reason } = this.props
    const hasRecs = items && items.length
    return (
      <PanelWrapper>
        <Header loading={loading} reason={reason} norecs={!hasRecs} />
        {!loading && <RecommendationList items={items} />}
      </PanelWrapper>
    )
  }
}
