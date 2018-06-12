import React, { Component } from 'react'
import styled from 'react-emotion'
import { Icon } from 'Elements/Icons/icon'
import { Shades, Colors } from 'Elements/Colors/colors'
import { domainForUrl } from 'Common/utilities'
import { localize } from 'Common/_locales/locales'
import { buttonReset } from 'Elements/Buttons/button'

const copy = {
  idle: localize('actions', 'save'),
  saving: localize('recommendations', 'saving'),
  saved: localize('recommendations', 'saved')
}

/* Styles
------------------------------------------------------- */
const Wrapper = styled('li')`
  display: grid;
  grid-template-columns: auto 90px;
  grid-template-rows: repeat(2, auto);
  margin: 0;
  font-size: 13px;
  font-weight: 300;
  line-height: 1.25em;
  color: ${Shades.pitch};
  border-top: 1px solid ${Shades.smoke};
`

const Content = styled('div')`
  padding: 10px;
  height: 90px;
  overflow: hidden;
  box-sizing: border-box;
`

const Source = styled('div')`
  color: $silver;
  font-size: 10px;
  line-height: 1em;
  margin: 0 0 10px;
`

const SaveAction = styled('button')`
  ${buttonReset};
  cursor: pointer;
  padding: 0 10px 5px;
  color: ${Shades.pitch};
  &:hover {
    color: ${Colors.hotCoral};
  }
`

const TitleLink = styled('button')`
  ${buttonReset};
  cursor: pointer;
  font-weight: 600;
  padding-bottom: 2px;
  box-sizing: border-box;
  max-height: 50px;
  color: ${Shades.pitch};
  &:hover {
    color: ${Colors.teal};
  }
`

const Image = styled('div')`
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  background-color: ${Shades.smoke};
  box-sizing: border-box;
  height: 100%;
  width: 90px;
  grid-row: 1/-1;
  grid-column: 2;
`

/* Renders
------------------------------------------------------- */
export class RecommendationItem extends Component {
  get recDetails() {
    const { item, tabId, position } = this.props
    return {
      tabId: tabId,
      item_id: item.id.toString(),
      title: item.title,
      url: item.url,
      position: position,
      source_id: item.source_id
    }
  }

  handleRecClick = () => {
    this.props.openRecommendation(this.recDetails)
  }

  handleSaveClick = () => {
    this.props.saveRecommendation(this.recDetails)
  }

  render() {
    const { item, status = 'idle' } = this.props

    return (
      <Wrapper style={this.props.motionStyle}>
        <Content>
          <TitleLink onClick={this.handleRecClick}>{item.title}</TitleLink>
          <Source>{domainForUrl(item.resolved_url)}</Source>
        </Content>

        <SaveAction onClick={this.handleSaveClick}>
          <Icon name="pocketmark" size="1.2em" /> {copy[status]}
        </SaveAction>

        <Image imageUrl={item.top_image_url} />
      </Wrapper>
    )
  }
}
