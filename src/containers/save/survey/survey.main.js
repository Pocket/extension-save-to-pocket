/* Import CSS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
import styles from './survey.scss'
import React, { Component } from 'react'
import { openTabWithUrl } from '../../../common/interface'

// import PropTypes from 'prop-types'

const Field = ({ name, label, options, surveyRespond }) => {
  return (
    <div>
      <header className={styles.header}>{label}</header>
      <ul className={styles.options}>
        {options.map(data => (
          <Option
            key={data.value}
            name={name}
            {...data}
            surveyRespond={surveyRespond}
          />
        ))}
      </ul>
    </div>
  )
}

const Option = ({ name, value, text, surveyRespond }) => {
  return (
    <li
      onClick={() => surveyRespond({ key: name, value })}
      className={styles.optionButton}>
      {text}
    </li>
  )
}

const Thanks = ({ canceled, feedback_url }) => {
  return canceled ? null : (
    <div className={styles.survey}>
      <h2 className={styles.thanksHeader}>Thanks for your response!</h2>
      <p className={styles.thanksP}>
        We're exploring ways to help you get back to your saves. More feedback?<br />
        Share it with us{' '}
        <button
          onClick={() => openTabWithUrl(feedback_url)}
          className={styles.thanksButton}>
          here ›
        </button>
      </p>
    </div>
  )
}

const Questionaire = ({
  fields,
  parameters,
  surveyRespond,
  surveyCancel,
  completed,
  canceled
}) => {
  const { feedback_url } = parameters
  return completed ? (
    <Thanks canceled={canceled} feedback_url={feedback_url} />
  ) : (
    <div className={styles.survey}>
      {fields.map(data => (
        <Field key={data.name} {...data} surveyRespond={surveyRespond} />
      ))}
      <button className={styles.dismiss} onClick={surveyCancel}>
        Don't show me this
      </button>
    </div>
  )
}

export default class Survey extends Component {
  render() {
    const { fields } = this.props.survey
    const questionairePros = {
      ...this.props.survey,
      surveyRespond: this.props.surveyRespond,
      surveyCancel: this.props.surveyCancel
    }
    return fields ? <Questionaire {...questionairePros} /> : null
  }
}

Survey.propTypes = {}
