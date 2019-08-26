import React, { Component } from 'react'
import styled from '@emotion/styled'
import { openTabWithUrl } from '../../../common/interface'
import { mixin_pocketButton } from '../../../common/styles/components'
import { COLORS } from '../../../common/styles/colors'
import { TYPOGRAPHY } from '../../../common/styles/variables'
const { $fontstackDefault } = TYPOGRAPHY
const {
  $powder,
  $white,
  $panelShadow,
  $pitch,
  $snow,
  $smoke,
  $overcast,
  $silver,
  $teal,
  $emerald
} = COLORS

const SurveyWrapper = styled.div`
  background-color: ${$powder};
  border-color: ${$white};
  border-radius: 4px;
  border-style: solid;
  border-width: 2px;
  box-shadow: ${$panelShadow};
  box-sizing: border-box;
  color: ${$pitch};
  font-family: ${$fontstackDefault};
  font-size: 13px;
  font-weight: 300;
  margin-top: 10px;
  padding: 1em;
  position: relative;
  text-shadow: none !important;
  width: 320px;
`

const SurveyHeader = styled.header`
  font-weight: 600;
  font-size: 1.2em;
  text-align: center;
  padding: 0 2rem 0.8rem;
  margin: 0;
`
const SurveyOptions = styled.ul`
  list-style-type: none;
  padding: 0 0;
  margin: 0;
  li {
    margin-bottom: 0.3em;
    display: block;
  }
`
const SurveyOptionsButton = styled.li`
${mixin_pocketButton}
    background-image: linear-gradient(to bottom, ${$white} 65%, ${$snow});
    border: 1px solid ${$smoke};
    border-radius: 3px;
    text-align: center;
    box-sizing: border-box;
    display: block;
    width: 100%;
    font-size: 1em;
    padding: 0.8em 1em;
    transition: all 150ms ease-out;
    &:hover {
      border: 1px solid ${$overcast};
      background-image: linear-gradient(to bottom, ${$white} 75%, ${$snow});
    }
`

const SurveyThanksHeader = styled.h2`
  font-size: 1rem;
  text-align: center;
  margin: 0;
  padding: 0 0 0.4em;
`
const SurveyThanksParagraph = styled.p`
  text-align: center;
`
const SurveyThanksButton = styled.button`
  all: unset;
  color: ${$teal};
  cursor: pointer;
  &:hover {
    color: ${$emerald};
  }
`
const SurveyDismissButton = styled.button`
  ${mixin_pocketButton}
  padding: 1em 1em 0.2em;
  text-align: center;
  display: block;
  box-sizing: border-box;
  text-decoration: underline;
  font-size: 0.875em;
  color: ${$silver};
  width: 100%;
`

const Field = ({ name, label, options, surveyRespond }) => {
  return (
    <div>
      <SurveyHeader>{label}</SurveyHeader>
      <SurveyOptions>
        {options.map(data => (
          <Option
            key={data.value}
            name={name}
            {...data}
            surveyRespond={surveyRespond}
          />
        ))}
      </SurveyOptions>
    </div>
  )
}

const Option = ({ name, value, text, surveyRespond }) => {
  return (
    <SurveyOptionsButton onClick={() => surveyRespond({ key: name, value })}>
      {text}
    </SurveyOptionsButton>
  )
}

const Thanks = ({ canceled, feedback_url }) => {
  return canceled ? null : (
    <SurveyWrapper>
      <SurveyThanksHeader>Thanks for your response!</SurveyThanksHeader>
      <SurveyThanksParagraph>
        We're exploring ways to help you get back to your saves. More feedback?
        <br />
        Share it with us{' '}
        <SurveyThanksButton onClick={() => openTabWithUrl(feedback_url)}>
          here ›
        </SurveyThanksButton>
      </SurveyThanksParagraph>
    </SurveyWrapper>
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
    <SurveyWrapper>
      {fields.map(data => (
        <Field key={data.name} {...data} surveyRespond={surveyRespond} />
      ))}
      <SurveyDismissButton onClick={surveyCancel}>
        Don't show me this
      </SurveyDismissButton>
    </SurveyWrapper>
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
