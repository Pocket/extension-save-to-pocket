/* Import CSS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
import styles from './survey.scss'
import React, { Component } from 'react'
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

const Questionaire = ({
  fields,
  surveyRespond,
  surveyCancel,
  completed,
  canceled
}) => {
  return completed ? (
    <Thanks canceled={canceled} />
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

const Thanks = ({ canceled }) => {
  return canceled ? null : (
    <div className={styles.survey}>
      <h2 className={styles.thanksHeader}>Thanks for your response!</h2>
      <p className={styles.thanksP}>
        We're exploring ways to help you get back t your saves. More Feedback?<br />
        Share it with us <button className={styles.thanksButton}>here</button>
      </p>
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
