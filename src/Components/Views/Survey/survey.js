import React, { Component } from 'react'
import styled from 'react-emotion'

import { PanelBase } from 'Elements/Foundations/foundation'
export const PanelWrapper = styled('div')`
  ${PanelBase};
`

export class Survey extends Component {
  render() {
    const { fields, selectOption } = this.props
    return (
      <PanelWrapper>
        {fields.map(field => (
          <div key={field.survey_id}>
            {field.label}
            <ul>
              {field.options.map(option => (
                <li onClick={() => selectOption(option.value)}>
                  {option.text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </PanelWrapper>
    )
  }
}

/*
{
    "parameters": {
        "timestamp": 1526419671,
        "hash": "4fba45db9ebf17ac91a3b21cde155671",
        "survey_id": "4361321",
        "target_id": "4361321",
        "impression_limit": "5",
    },
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
    ]
}

*/
