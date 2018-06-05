import React from 'react'
import { storiesOf } from '@storybook/react'
import TypeAhead from './typeAhead'
import { COLORS } from 'Common/_mocks/colors'
import { KEYS } from 'Common/constants'

class TypeAheadStory extends React.Component {
  constructor(props) {
    super(props)
    this.state = { inputValue: '' }
  }

  setTextInputRef = element => (this.textInput = element)
  setValue = value => this.setState({ inputValue: value })
  onChange = event => this.setValue(event.target.value)
  reFocus = () => this.textInput.current.focus()

  keyDown = event => {
    if (event.keyCode === KEYS.ESCAPE) this.setValue('')
  }

  componentDidMount() {
    this.setState({ inputReady: true })
  }

  render() {
    return (
      <div>
        <input
          style={{ width: '100%', boxSizing: 'border-box' }}
          ref={this.setTextInputRef}
          type="text"
          value={this.state.inputValue}
          onChange={this.onChange}
          onKeyDown={this.keyDown}
        />

        <TypeAhead
          inputReady={this.state.inputReady}
          reFocus={this.reFocus}
          setValue={this.setValue}
          inputValue={this.state.inputValue}
          textInput={this.textInput}
          items={COLORS}
        />
      </div>
    )
  }
}

storiesOf('Modules|Typeahead', module)
  .addDecorator(story => <div style={{ position: 'relative' }}>{story()}</div>)
  .add('Color Data', () => <TypeAheadStory />)
