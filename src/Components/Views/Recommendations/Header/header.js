import React from 'react'
import styled from 'react-emotion'

import { Spinner } from 'Elements/Spinner/spinner'
import { Shades } from 'Elements/Colors/colors'
import { ButtonLink } from 'Elements/Buttons/button'

import { localize } from 'Common/_locales/locales'
import { RECOMMENDED_PAGE } from 'Common/constants'
import { openTabWithUrl } from 'Common/interface'

/* Styles
------------------------------------------------------- */

export const HeaderWrapper = styled('div')`
  color: ${Shades.darksmoke};
  font-size: 12px;
  letter-spacing: 0.1px;
  line-height: 16px;
  padding: 0.8em 0;
  text-align: center;
  text-transform: uppercase;
`

/* Blocks
------------------------------------------------------- */
function Loading() {
  return (
    <React.Fragment>
      <Spinner /> {localize('recommendations', 'loading')}
    </React.Fragment>
  )
}

function Reason({ reason }) {
  return reason
    ? `${localize('recommendations', 'more_on')} ${reason}`
    : localize('recommendations', 'people_also_saved')
}

function NoRecs() {
  return (
    <React.Fragment>
      {localize('recommendations', 'more_stories_detail')}
      <div>
        <ButtonLink onClick={() => openTabWithUrl(RECOMMENDED_PAGE)}>
          {localize('recommendations', 'explore')}
        </ButtonLink>
      </div>
    </React.Fragment>
  )
}

/* Renders
------------------------------------------------------- */
function headerCopy(noRecs, reason) {
  return noRecs ? <NoRecs /> : <Reason reason={reason} />
}

export function Header({ loading, norecs, reason }) {
  return (
    <HeaderWrapper>
      {loading ? <Loading /> : headerCopy(norecs, reason)}{' '}
    </HeaderWrapper>
  )
}
