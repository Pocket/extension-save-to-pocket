import Loading from './loading'
import { localize } from 'common/_locales/locales'
import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { COLORS } from 'elements/colors/colors'
const { $darksmoke, $teal } = COLORS

const hasRecs = recs => recs
const hasFeed = recs => recs && recs.feed && recs.feed.length > 0

const HeaderWrapper = styled.div`
  a {
    color: ${$teal};
    display: block;
    text-align: center;

    &:hover {
      color: darken(${$teal}, 10%);
    }
  }
`
const HeaderSection = styled.div`
  color: ${$darksmoke};
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.1px;
  line-height: 16px;
  margin: 0;
  padding: 0.5em 0 0.8em;
  text-align: center;
  text-transform: uppercase;
`
Header.propTypes = {
  recs: PropTypes.shape({
    reason: PropTypes.string,
    feed: PropTypes.array
  })
}
export default function Header({ recs }) {
  return (
    <HeaderWrapper>
      {!hasRecs(recs) && <Loading />}

      {hasRecs(recs) && (
        <div>
          {hasFeed(recs) && (
            <HeaderSection>
              {recs.reason
                ? `${localize('recommendations', 'more_on')} ${recs.reason}`
                : localize('recommendations', 'people_also_saved')}
            </HeaderSection>
          )}

          {!hasFeed(recs) && (
            <HeaderSection>
              {localize('recommendations', 'more_stories_detail')}
              <a
                href="https://getpocket.com/a/recommended/?src=ext_recs"
                rel="noopener noreferrer"
                target="_blank">
                {localize('recommendations', 'explore')}
              </a>
            </HeaderSection>
          )}
        </div>
      )}
    </HeaderWrapper>
  )
}
