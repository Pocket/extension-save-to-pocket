import SpocMenu from './spoc.menu.js'
import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { COLORS } from 'elements/colors/colors'
const { $pitch } = COLORS

const SponsorHeader = styled.div`
  display: flex;
  font-size: 12px;
  justify-content: space-between;
  align-items: baseline;
  line-height: 20px;
  padding: 8px 0px 2px 8px;
  position: relative;
`
const SponsorAvatar = styled.img`
  border-radius: 50%;
  display: inline-block;
  height: 20px;
  margin-right: 5px;
  vertical-align: top;
  width: 20px;
`
const SponsorLink = styled.a`
  color: ${$pitch};
  font-weight: 600;
  text-decoration: none;
`
SpocHeader.propTypes = {
  spocRemove: PropTypes.func,
  tabId: PropTypes.number,
  itemId: PropTypes.number,
  spocContext: PropTypes.object,
  spocImpression: PropTypes.object,
  spocView: PropTypes.object,
  sponsorurl: PropTypes.string,
  avatar: PropTypes.string,
  sponsor: PropTypes.string
}
export default function SpocHeader({
  spocContext,
  spocImpression,
  spocRemove,
  spocView,
  sponsorurl,
  avatar,
  tabId,
  itemId,
  sponsor
}) {
  useEffect(() => {
    spocImpression({ context: spocContext })

    const viewTimer = setTimeout(() => {
      spocView({ context: spocContext })
    }, 1001)

    return function() {
      clearTimeout(viewTimer)
    }
  })

  return (
    <SponsorHeader>
      <SponsorLink href={sponsorurl} rel="noopener noreferrer" target="_blank">
        <SponsorAvatar src={avatar} alt={sponsor} /> {sponsor}
      </SponsorLink>

      <SpocMenu spocRemove={spocRemove} tabId={tabId} itemId={itemId} />
    </SponsorHeader>
  )
}
