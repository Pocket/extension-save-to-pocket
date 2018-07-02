import React from 'react'
import { storiesOf } from '@storybook/react'
import { ToolbarMain } from './toolbar'
import Tagging from 'Modules/Tagging/tagging'
import styled from 'react-emotion'

const TagsWrapper = styled('div')`
  padding-top: 6px;
`

/* Renderers
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function Tags({ status }) {
  const validForTags = ['saving', 'saved']
  return validForTags.includes(status) ? (
    <TagsWrapper>
      <Tagging />
    </TagsWrapper>
  ) : null
}

storiesOf('Views|Toolbar/Panel', module)
  .addDecorator(story => <div style={{ width: '320px' }}>{story()}</div>)
  .add('Saved - Link', () => (
    <ToolbarMain
      saveType={'link'}
      status={'saved'}
      tagging={<Tags status={'saved'} />}
    />
  ))
  .add('Saved - Page', () => (
    <ToolbarMain
      saveType={'page'}
      status={'saved'}
      tagging={<Tags status={'saved'} />}
    />
  ))
  .add('Saving', () => <ToolbarMain saveType={'page'} status={'saving'} />)
  .add('Archiving', () => (
    <ToolbarMain saveType={'page'} status={'archiving'} />
  ))
  .add('Archived', () => <ToolbarMain saveType={'page'} status={'archived'} />)
  .add('Removing', () => <ToolbarMain saveType={'page'} status={'removing'} />)
  .add('Removed', () => <ToolbarMain saveType={'page'} status={'removed'} />)
  .add('Error', () => (
    <ToolbarMain
      saveType={'page'}
      status={'error'}
      tags={<Tags status={'saved'} />}
    />
  ))
