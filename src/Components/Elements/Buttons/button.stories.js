import React from 'react'
import { css } from 'emotion'
import { storiesOf } from '@storybook/react'
import styled from 'react-emotion'
import { StyledButton } from './button'
import { Icon } from 'Elements/Icons/icon'

const ButtonStandard = styled('button')`
  ${StyledButton};
`
const ButtonWarn = styled('button')`
  ${StyledButton({ type: 'warn' })};
`
const ButtonCTA = styled('button')`
  ${StyledButton({ type: 'cta' })};
`
const ButtonContainer = styled('div')`
  display: flex;
  flex-direction: rows;
`
storiesOf('Elements|Buttons', module)
  .addDecorator(story => (
    <div
      className={css`
        button {
          margin: 0 15px;
        }
      `}>
      {story()}
    </div>
  ))
  .add('All Buttons', () => (
    <ButtonContainer>
      <ButtonStandard>Button Copy</ButtonStandard>
      <ButtonStandard>
        <Icon name="pocketmark" margin="0 8px 0 0" />Button Copy
      </ButtonStandard>
      <ButtonWarn>Button Copy</ButtonWarn>
      <ButtonCTA>Button Copy</ButtonCTA>
    </ButtonContainer>
  ))
  .add('Default', () => (
    <div>
      <ButtonStandard>Button Copy</ButtonStandard>
      <ButtonStandard>
        <Icon name="question" margin="0 8px 0 0" /> Button Copy
      </ButtonStandard>
    </div>
  ))
  .add('Warn', () => (
    <div>
      <ButtonWarn>Button Copy</ButtonWarn>
      <ButtonWarn>
        <Icon name="archive_page" margin="0 8px 0 0" /> Button Copy
      </ButtonWarn>
    </div>
  ))
  .add('CTA', () => (
    <div>
      <ButtonCTA>Button Copy</ButtonCTA>
      <ButtonCTA>
        <Icon name="premium" margin="0 8px 0 0" /> Button Copy
      </ButtonCTA>
    </div>
  ))
