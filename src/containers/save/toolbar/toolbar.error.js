import React, { Component } from 'react'
import { localize } from 'common/_locales/locales'
import styled from '@emotion/styled'
import { COLORS } from 'elements/colors/colors'
const { $snow, $black } = COLORS

const ToolbarErrorWrapper = styled.div`
  background-color: ${$snow};
  border-radius: 4px;
  box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.5);
  color: ${$black};
  font-size: 14px;
  margin-top: 10px;
  padding: 10px;
`
class ToolbarError extends Component {
  render() {
    return (
      <ToolbarErrorWrapper>
        {localize('error', 'page_not_saved_detail')}
      </ToolbarErrorWrapper>
    )
  }
}

export default ToolbarError
