import React from 'react'
import styled from 'react-emotion'
import { storiesOf } from '@storybook/react'

import { PanelBase } from './foundation'

const Panel = styled('div')`
  ${PanelBase};
  position: relative;
  padding: 1em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  width: 310px;
  height: 100px;
`

storiesOf('Elements|Foundations', module).add('Panel', () => <Panel />)
