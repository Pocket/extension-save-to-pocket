import React, { PureComponent } from 'react'
import { localize } from 'Common/_locales/locales'
import styled from 'react-emotion'
import { Shades } from 'Elements/Colors/colors'

const ErrorWrapper = styled('div')`
  background-color: ${Shades.snow};
  border-radius: 4px;
  box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.5);
  color: $black;
  font-size: 14px;
  padding: 10px;
`

export class ToolbarError extends PureComponent {
  render() {
    return (
      <ErrorWrapper>{localize('error', 'page_not_saved_detail')}</ErrorWrapper>
    )
  }
}
