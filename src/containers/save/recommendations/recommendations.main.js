import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import RecommendationList from './list/list'
import Header from './header/header'
import { COLORS, UTILIZATION } from 'common/styles/colors'
import { TYPOGRAPHY } from 'common/styles/variables'
const { $fontstackDefault } = TYPOGRAPHY
const { $powder, $white, $pitch } = COLORS
const { $panelShadow } = UTILIZATION

const RecommendationsWrapper = styled.div`
  background-color: ${$powder};
  border-color: ${$white};
  border-radius: 4px;
  border-style: solid;
  border-width: 2px;
  box-shadow: ${$panelShadow};
  box-sizing: border-box;
  color: ${$pitch};
  font-family: ${$fontstackDefault};
  font-size: 13px;
  font-weight: 300;
  margin-top: 10px;
  padding: 5px 0 0;
  position: relative;
  text-shadow: none !important;
  width: 320px;
`

Recommendations.propTypes = {
  recs: PropTypes.object,
  saveRecommendation: PropTypes.func,
  removeRecommendation: PropTypes.func,
  spocClick: PropTypes.func,
  spocRemove: PropTypes.func,
  tabId: PropTypes.number,
  spocContext: PropTypes.object,
  spocImpression: PropTypes.object,
  spocView: PropTypes.object,
  avatar: PropTypes.string,
  sponsor: PropTypes.string
}
export default function Recommendations({
  recs,
  tabId,
  saveRecommendation,
  openRecommendation,
  spocView,
  spocClick,
  spocRemove,
  spocImpression
}) {
  return (
    <RecommendationsWrapper>
      <Header recs={recs} />
      {recs && (
        <RecommendationList
          tabId={tabId}
          saveRecommendation={saveRecommendation}
          openRecommendation={openRecommendation}
          spocImpression={spocImpression}
          spocView={spocView}
          spocClick={spocClick}
          spocRemove={spocRemove}
          list={recs.feed}
        />
      )}
    </RecommendationsWrapper>
  )
}
