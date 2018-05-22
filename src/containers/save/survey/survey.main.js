/* Import CSS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
import styles from './survey.scss'
import React, { Component } from 'react'
// import PropTypes from 'prop-types'

export default class Survey extends Component {
  render() {
    return (
      <div className={styles.survey}>
        <header className={styles.header}>
          When do you want to come back to this?
        </header>
        <ul className={styles.options}>
          <li>
            <button className={styles.optionButton}>Someday</button>
          </li>
          <li>
            <button className={styles.optionButton}>Another Day</button>
          </li>
          <li>
            <button className={styles.optionButton}>Later</button>
          </li>
          <li>
            <button className={styles.optionButton}>Now</button>
          </li>
        </ul>
        <button className={styles.dismiss}>Don't show me this</button>
      </div>
    )
  }
}

Survey.propTypes = {}

/*
{
  "ts": 1526419671,
  "hash": "4fba45db9ebf17ac91a3b21cde155671",
  "survey_id": "4361321",
  "fields": [
    {
      "name": "q_99",
      "label": "Question #1",
      "type": "radio",
      "required": true,
      "options": [
        {
          "value": "0:10001",
          "text": "Option 1"
        },
        {
          "value": "1:10003",
          "text": "Option 3"
        },
        {
          "value": "2:10002",
          "text": "Option 2"
        }
      ]
    }
  ],
  "target_id": "4361321"
}
*/
