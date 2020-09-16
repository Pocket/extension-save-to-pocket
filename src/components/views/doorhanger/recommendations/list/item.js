import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { COLORS } from 'elements/colors/colors'
import { mixin_pocketButton } from 'common/styles/components'
import * as Icon from 'elements/icons'
import { getImageCacheUrl } from 'common/helpers'
import { domainForUrl } from 'common/utilities'
import { localize } from 'common/_locales/locales'
const {
  $powder,
  $silver,
  $smoke,
  $hotCoral,
  $white,
  $pitch,
  $overcast,
  $black,
  $teal
} = COLORS

const copy = {
  idle: localize('actions', 'save'),
  saving: localize('recommendations', 'saving'),
  saved: localize('recommendations', 'saved')
}

const containerStyle = `
  box-sizing: border-box;
  display: block;
  margin: 0;
  overflow: hidden;
  position: relative;
  width: 100%;
`
export const ItemContainer = styled.div`
  ${containerStyle}
  height: 110px;
  padding: 10px;
  padding-right: ${props => (props.hasImage ? '92px' : '10px')};
`
export const SpocContainer = styled.div`
  ${containerStyle}
  height: 131px;
  padding: 8px 10px 10px;
  padding-right: ${props => (props.hasImage ? '92px' : '10px')};
`
export const ItemImage = styled.div`
  background-color: ${$smoke};
  border: 5px solid ${$powder};
  border-radius: 8px;
  box-sizing: border-box;
  height: 108px;
  position: absolute;
  right: 0;
  top: 0;
  width: 90px;
  z-index: 2;

  .isSpoc & {
    height: 129px;
  }
  &:hover {
    border-color: ${$white};
  }
`
export const ItemTitle = styled.div`
  box-sizing: border-box;
  color: ${$pitch};
  display: block;
  font-size: 13px;
  font-weight: 300;
  height: 3.75em;
  line-height: 1.25em;
  max-width: 296px;
  overflow: hidden;
  padding: 0 0 10px;
  text-align: left;
`
export const ItemLink = styled.a`
  cursor: pointer;
  display: block;
  overflow: hidden;
  text-decoration: none;
  text-overflow: ellipsis;

  &:link,
  &:visited,
  &:active {
    color: ${$black};
  }

  &:hover {
    color: ${$teal};
  }
`
export const ItemSource = styled.div`
  color: ${$silver};
  font-size: 10px;
  line-height: 1em;
  margin: 3px 0 9px;
`
export const ItemActions = styled.div`
  display: block;
`
export const SaveButton = styled.button`
  ${mixin_pocketButton}

  background-color: transparent;
  border: 0;
  color: ${$overcast};
  cursor: pointer;
  display: block;
  font-size: 12px;
  font-weight: 100;
  line-height: 16px;
  text-decoration: none;

  &:hover {
    border: 0;
    color: ${$hotCoral};
  }
`

export default function RecommendationItem({
  tabId,
  position,
  item,
  saveRecommendation,
  openRecommendation
}) {
  const cachedImage = getImageCacheUrl(item.image, { width: 180, height: 216 })
  const imageStyle = {
    backgroundImage: 'url("' + cachedImage + '")',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }

  const saveCopy = copy[item.status]

  const onClick = () => {
    openRecommendation({
      tabId: tabId,
      item_id: item.id.toString(),
      title: item.title,
      url: item.url,
      position: position,
      source_id: item.source_id
    })
  }

  return (
    <ItemContainer hasImage={item.has_image}>
      {item.has_image && <ItemImage style={imageStyle} />}

      <ItemTitle>
        <ItemLink
          onClick={onClick}
          href={item.url}
          rel="noopener noreferrer"
          target="_blank">
          {item.title}
        </ItemLink>
      </ItemTitle>

      <ItemSource>{domainForUrl(item.display_url)}</ItemSource>

      <ItemActions>
        <SaveButton
          onClick={() => {
            return saveRecommendation({
              tabId: tabId,
              item_id: item.id.toString(),
              title: item.title,
              url: item.url,
              position: position,
              source_id: item.source_id
            })
          }}>
          {Icon.Save()} {saveCopy}
        </SaveButton>
      </ItemActions>
    </ItemContainer>
  )
}

RecommendationItem.propTypes = {
  tabId: PropTypes.number,
  position: PropTypes.number,
  item: PropTypes.shape({
    id: PropTypes.number,
    has_image: PropTypes.bool,
    image: PropTypes.string,
    url: PropTypes.string,
    display_url: PropTypes.string,
    title: PropTypes.string,
    source_id: PropTypes.string
  }),
  openRecommendation: PropTypes.func,
  saveRecommendation: PropTypes.func
}
