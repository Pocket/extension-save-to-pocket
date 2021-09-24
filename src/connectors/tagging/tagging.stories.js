import React from 'react'
import { CHEMICAL_ELEMENTS } from 'common/_mocks/tags'
import samplesize from 'lodash.samplesize'
import { storiesOf } from '@storybook/react'
import Tagging from './tagging'

/* Tagging Story
------------------------------------------------------- */
export default class MockState extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      marked: samplesize(CHEMICAL_ELEMENTS, 5),
      used: samplesize(CHEMICAL_ELEMENTS, 5),
      suggested: samplesize(CHEMICAL_ELEMENTS, 5)
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

  render() {
    return (
      <React.Fragment>
        <Tagging
          addTag={this.addTag}
          removeTag={this.removeTag}
          setTags={this.setTags}
          tags={this.state.tags}
          typeahead={CHEMICAL_ELEMENTS}
        />
      </React.Fragment>
    )
  }
}

storiesOf('Modules | Tagging', module).add('all', () => (
  <div style={{ width: '300px' }}>
    <Tagging
      tags={{
        marked: samplesize(CHEMICAL_ELEMENTS, 2),
        used: samplesize(CHEMICAL_ELEMENTS, 3),
        suggested: samplesize(CHEMICAL_ELEMENTS, 5)
      }}
      activateTag={() => {}}
      deactivateTags={() => {}}
      addTag={() => {}}
      removeTags={() => {}}
    />
  </div>
))
