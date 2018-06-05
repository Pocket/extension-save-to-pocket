import React from 'react'
import { storiesOf } from '@storybook/react'
import samplesize from 'lodash.samplesize'
import Tagging from './tagging'
import { COLORS } from 'Common/_mocks/colors'

/* Tagging Story
------------------------------------------------------- */
export default class MockState extends React.Component {
  constructor(props) {
    super(props)
    this.state = { tags: samplesize(COLORS, 5) }
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

  render() {
    return (
      <Tagging
        addTag={this.addTag}
        removeTag={this.removeTag}
        setTags={this.setTags}
        tags={this.state.tags}
        typeahead={COLORS}
      />
    )
  }
}

storiesOf('Modules|Tagging', module).add('Tags Populated', () => <MockState />)
