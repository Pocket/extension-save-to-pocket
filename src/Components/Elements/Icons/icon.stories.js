import React from 'react'
import styled, { css } from 'react-emotion'
import { storiesOf } from '@storybook/react'
import { Icon } from './icon'
import { Colors, Shades } from '../Colors/colors'
import { PanelBase } from '../Foundations/foundation'

const extensionIcons = [
  'about',
  'added',
  'androidlogo',
  'archive',
  'arrowdown',
  'arrowleft',
  'arrowright',
  'arrowup',
  'carretdown',
  'close',
  'cog',
  'defaultsite',
  'disconnected',
  'hide',
  'hideall',
  'iphoneipad',
  'lock',
  'mac',
  'openpocket',
  'options',
  'overflow',
  'pocketlogo',
  'pocketlogotype',
  'pocketnewtab',
  'question',
  'refresh',
  'save',
  'search',
  'settings',
  'topsites'
]

const IconOverlay = styled('div')`
  font-size: ${props => (props.size ? props.size : 16)}px;
  padding: 20px;
  position: relative;
  margin-left: 60px;
`

const IconDisplaySheet = styled('div')`
  ${PanelBase};
  padding: 0 1em 1.5em;
`

const IconDisplayBox = styled('div')`
  font-weight: 200;
  margin-right: 10px;
  display: flex-block;
  align-content: center;
  justify-content: center;
  text-align: center;
  flex-direction: row;
  min-width: 128px;
  padding: 15px 0;
  :not(:last-child) {
    border-bottom: 1px solid ${Shades.snow};
  }
`

const IconDisplay = styled('div')`
  font-size: ${props => (props.size ? props.size : 16)}px;
  display: block;
  cursor: pointer;
  &:hover {
    color: ${Colors.teal};
  }
`

const displaySizes = [120, 96, 72, 48, 24]

const iconShowcase = (icon, box = 24) => (
  <div>
    <div
      className={css`
        display: flex;
        margin-bottom: 2em;
        border-bottom: 1px solid #ccc;
        padding-bottom: 2em;
      `}>
      <IconDisplaySheet>
        {displaySizes.map((size, index) => (
          <IconDisplayBox key={size + index}>
            <IconDisplay size={size}>
              <Icon name={icon} box={box} />
            </IconDisplay>
            {size}px
          </IconDisplayBox>
        ))}
      </IconDisplaySheet>
      <IconOverlay size={360}>
        <IconGrid gridSize={box} />
        <IconGuide guideSize={box} />
        <Icon name={icon} box={box} />
      </IconOverlay>
    </div>
    <h1>
      <Icon name={icon} box={box} /> {icon}-icon used with copy
    </h1>
    <p>
      Lorem ipsum dolor sit amet, <Icon name={icon} /> consectetur adipisicing
      elit. Ducimus accusamus nemo molestias, id ratione, labore. Unde soluta
      cumque rerum velit, esse, asperiores repellat amet nulla hic dolorum
      distinctio tenetur quae.
    </p>
  </div>
)

const IconGuide = ({ guideSize = 24 }) => (
  <div
    className={css`
      position: absolute;
      color: ${Colors.teal};
    `}>
    <Icon name={`guide${guideSize}`} />
  </div>
)

const IconGrid = ({ gridSize = 24 }) => (
  <div
    className={css`
      position: absolute;
      color: ${Shades.snow};
    `}>
    <Icon name={`grid${gridSize}`} />
  </div>
)

storiesOf('Elements|Icons', module)
  .addDecorator(story => (
    <div
      className={css`
        h1 {
          margin: 0 0 16px 0;
          padding: 0;
          line-height: 1;
          font-weight: 200;
          position: relative;
        }
        h1:after {
          width: 100%;
          height: 1px;
          content: '';
          position: absolute;
          bottom: 0.13em;
          left: 0;
          background-color: ${Colors.teal};
          z-index: -100;
        }
        h1:before {
          width: 100%;
          height: 1px;
          content: '';
          position: absolute;
          top: 0.27em;
          left: 0;
          background-color: ${Colors.teal};
          z-index: -100;
        }
      `}>
      {story()}
    </div>
  ))
  .add('All', () => (
    <div style={{ fontSize: '128px', lineHeight: '1.25em' }}>
      {extensionIcons.map(icon => <Icon name={icon} key={icon.name} />)}
    </div>
  ))

extensionIcons.forEach(icon => {
  storiesOf('Elements|Icons', module).add(icon, () => iconShowcase(icon))
})
