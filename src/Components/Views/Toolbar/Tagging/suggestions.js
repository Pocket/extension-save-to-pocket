import styles from './suggestions.scss'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Suggestions extends Component {
  prevent = event => {
    event.preventDefault()
  }

  get usedTags() {
    return this.props.tags.used || []
  }
  get listItems() {
    return this.props.suggestions
      .filter(item => !this.usedTags.includes(item))
      .map((suggestion, index) => {
        return (
          <li
            key={index}
            onMouseDown={event => this.prevent(event)}
            onClick={() => this.props.addTag(suggestion)}
            className={styles.suggestion}>
            {suggestion}
          </li>
        )
      })
  }

  render() {
    return (
      <div className={styles.suggestions}>
        <div>
          {/*<div className={styles.header}>Suggested Tags</div>*/}
          <ul className={styles.suggestionsList}>{this.listItems}</ul>
        </div>
      </div>
    )
  }
}

Suggestions.propTypes = {
  suggestions: PropTypes.array,
  addTag: PropTypes.func,
  value: PropTypes.string,
  tags: PropTypes.object
}

/*
@import '../../../../../Common/_styles/colors';

.suggestions {
  box-sizing: border-box;
  color: $pitch;
  display: block;
  font-size: 13px;
  line-height: 17px;
  text-align: left;
  width: 100%;
}

.header {
  border-bottom: 1px solid $snow;
  font-size: 1.1em;
  font-weight: 400;
  padding: 0.3em 0;
}

.suggestionsList {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  margin: 0;
  padding: 10px 0 0;
  text-align: left;
}

.suggestion {
  background-color: $snow;
  border: 1px solid $silver;
  border-radius: 3px;
  color: $tar;
  cursor: pointer;
  display: inline-block;
  // flex-grow: 1;
  font-weight: 300;
  letter-spacing: 0.05em;
  line-height: 16px;
  margin-bottom: 4px;
  margin-right: 6px;
  min-width: 15%;
  padding: 2px 8px;
  text-align: center;
  text-transform: lowercase;
  transform: translateZ(0.1);

  &:hover {
    background-color: $darksmoke;
    border-color: $overcast;
    color: $white;
  }
}


*/
