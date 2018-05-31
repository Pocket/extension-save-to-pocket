import React from 'react'
import styled from 'react-emotion'
import { storiesOf } from '@storybook/react'

import { DoorHangerBase } from './foundation'

const Card = styled('div')`
  ${DoorHangerBase};
  position: relative;
  padding: 1em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  width: 12em;
  height: 5em;
`

storiesOf('Elements|Foundations', module).add('Card', () => <Card />)
