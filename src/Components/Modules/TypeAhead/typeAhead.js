import React from 'react'
import matchSorter, { rankings } from 'match-sorter'
import { TypeAheadMenu } from './typeAhead.menu'
import { TypeAheadItem } from './typeAhead.item'
import { KEYS } from 'Common/constants'

const DOWN = true
const UP = false

export default class TypeAhead extends React.Component {
  constructor(props) {
    super(props)
    this.allItems = props.items
    this.state = {
      ready: false,
      selectedIndex: -1,
      items: []
    }
  }

  /* Lifecycle Hooks
  ------------------------------------------------------- */
  componentWillReceiveProps(nextProps) {
    if (this.state.ready) return
    this.textInput = nextProps.textInput
    this.textInput.addEventListener('keydown', this.keyDown)
    this.setState({ ready: true })
  }

  componentWillUnmount() {
    this.textInput.removeEventListener('keydown', this.keydown)
  }

  componentWillUpdate(nextProps) {
    if (nextProps.inputValue !== this.props.inputValue) {
      const nextItems = matchSorter(this.allItems, nextProps.inputValue, {
        threshold: rankings.CONTAINS
      }).filter(
        item => item.toLowerCase() !== nextProps.inputValue.toLowerCase()
      )

      this.setState({
        items: nextItems,
        selectedIndex: -1
      })
    }
  }

  /* Key Events
  ------------------------------------------------------- */
  keyDown = event => {
    const validCodes = [KEYS.DOWN, KEYS.UP, KEYS.ENTER]
    if (!validCodes.includes(event.keyCode)) return
    if (!this.state.items.length) return

    if (event.keyCode === KEYS.ENTER) {
      if (this.state.selectedIndex > -1) {
        event.preventDefault()
        event.stopPropagation()
        this.props.setValue(this.state.items[this.state.selectedIndex])
      }
      return
    }

    event.preventDefault()

    const direction = event.keyCode === 40 ? DOWN : UP
    this.adjustSelected(direction)
  }

  /* Selection Manipulation
  ------------------------------------------------------- */
  setSelected = index => {
    this.props.reFocus()
    return this.props.setValue(this.state.items[index])
  }

  adjustSelected = moveDown => {
    if (this.state.selectedIndex === -1) {
      return this.setState({
        selectedIndex: moveDown ? 0 : this.state.items.length - 1
      })
    }
    return moveDown ? this.selectedDown() : this.selectedUp()
  }

  selectedUp = () => {
    const nextIndex =
      this.state.selectedIndex > 0
        ? this.state.selectedIndex - 1
        : this.state.items.length - 1
    this.setState({ selectedIndex: nextIndex })
  }

  selectedDown = () => {
    const nextIndex =
      this.state.selectedIndex < this.state.items.length - 1
        ? this.state.selectedIndex + 1
        : 0
    this.setState({ selectedIndex: nextIndex })
  }

  /* Utilities
  ------------------------------------------------------- */
  get isOpen() {
    return (
      !!this.props.inputValue.length &&
      this.state.items.length > 0 &&
      this.state.ready
    )
  }

  /* Render
  ------------------------------------------------------- */
  render() {
    return this.isOpen ? (
      <TypeAheadMenu data-positioned>
        {this.state.items.map((item, index) => (
          <TypeAheadItem
            key={item + index}
            item={item}
            index={index}
            isActive={index === this.state.selectedIndex}
            action={this.setSelected}
          />
        ))}
      </TypeAheadMenu>
    ) : null
  }
}
