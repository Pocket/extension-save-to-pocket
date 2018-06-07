import React, { Component } from 'react'
import styled from 'react-emotion'
import { Shades, Colors } from 'Elements/Colors/colors'
import { StyledButton, buttonReset } from 'Elements/Buttons/button'
import { PanelBase } from 'Elements/Foundations/foundation'

const PanelWrapper = styled('div')`
  ${PanelBase};
  padding: 0.8rem;
  text-align: center;
`
const CancelSurvey = styled('button')`
  ${buttonReset};
  font-size: 0.6rem;
  color: ${Shades.overcast};
  padding-top: 0.6rem;
  &:hover {
    color: ${Colors.teal};
  }
`

const FieldSet = styled('fieldset')`
  all: unset;
`
const FieldTitle = styled('legend')`
  all: unset;
  font-size: 1rem;
  padding: 0.2rem 3.5rem 1rem;
  font-weight: 600;
`
const FieldOption = styled('button')`
  ${StyledButton};
  width: 100%;
  margin-bottom: 4px;
  font-size: 0.875rem;
`

function FieldOptions({ options, name }) {
  return options.map(option => {
    const { text, value } = option
    return (
      <FieldOption onClick={() => console.log(`${name}:${value}`)}>
        {text}
      </FieldOption>
    )
  })
}

function Fields({ fields }) {
  return fields.map(fieldset => {
    const { label, options, name } = fieldset
    return (
      <FieldSet>
        <FieldTitle>{label}</FieldTitle>
        <FieldOptions options={options} name={name} />
      </FieldSet>
    )
  })
}

export class SurveyPanel extends Component {
  render() {
    const { fields } = this.props
    return fields ? (
      <PanelWrapper>
        <Fields fields={fields} />
        <CancelSurvey>Don't show me this</CancelSurvey>
      </PanelWrapper>
    ) : null
  }
}
