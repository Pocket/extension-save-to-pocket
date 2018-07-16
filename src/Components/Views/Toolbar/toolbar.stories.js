import React from 'react'
import { storiesOf } from '@storybook/react'
import { ToolbarMain } from './toolbar'
import { Tagging } from 'Modules/Tagging/tagging'
import { COLORS } from 'Common/_mocks/colors'

// Adding Mock State for Tag Management
export default class MockState extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tags: COLORS.slice(0, 5)
    }
  }

  addTag = tag => {
    if (this.state.tags.includes(tag)) return
    this.setState({ tags: [...this.state.tags, tag] })
  }

  removeTag = tag => {
    if (!this.state.tags.includes(tag)) return
    this.setState({ tags: this.state.tags.filter(current => current !== tag) })
  }

  setTags = tags => {
    this.setState({ tags })
  }

  get suggestions() {
    return this.props.suggestions || []
  }
  render() {
    return (
      <Tagging
        addTag={this.addTag}
        removeTag={this.removeTag}
        setTags={this.setTags}
        tags={this.state.tags}
        suggestions={this.suggestions}
        typeahead={COLORS}
      />
    )
  }
}

storiesOf('Views|Toolbar/Panel', module)
  .addDecorator(story => <div style={{ width: '320px' }}>{story()}</div>)
  .add('Saved - Link', () => <ToolbarMain saveType={'link'} status={'saved'} />)
  .add('Saved - Page', () => <ToolbarMain saveType={'page'} status={'saved'} />)
  .add('Saving', () => <ToolbarMain saveType={'page'} status={'saving'} />)
  .add('Archiving', () => (
    <ToolbarMain saveType={'page'} status={'archiving'} />
  ))
  .add('Archived', () => <ToolbarMain saveType={'page'} status={'archived'} />)
  .add('Removing', () => <ToolbarMain saveType={'page'} status={'removing'} />)
  .add('Removed', () => <ToolbarMain saveType={'page'} status={'removed'} />)

storiesOf('Views|Toolbar/Panel (Error)', module)
  .addDecorator(story => <div style={{ width: '320px' }}>{story()}</div>)
  .add('Error', () => <ToolbarMain saveType={'page'} status={'error'} />)

storiesOf('Views|Toolbar/Panel (Tags)', module)
  .addDecorator(story => <div style={{ width: '320px' }}>{story()}</div>)
  .add('w/ Suggestions', () => (
    <ToolbarMain saveType={'page'} status={'saved'}>
      <MockState suggestions={COLORS.slice(0, 4)} />
    </ToolbarMain>
  ))
  .add('w/o Suggestions', () => (
    <ToolbarMain saveType={'page'} status={'saved'}>
      <MockState />
    </ToolbarMain>
  ))
