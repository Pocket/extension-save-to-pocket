import React from 'react'
import { css } from 'emotion'
import { storiesOf } from '@storybook/react'
import { StyledButton } from './button'

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
    <div>
      <StyledButton>Button Copy</StyledButton>
      <StyledButton type="warn">Button Copy</StyledButton>
      <StyledButton type="cta">Button Copy</StyledButton>
      <div
        className={css`
          font-size: 14px;
          margin: 15px;
          max-width: 400px;
        `}>
        <h3>To Do:</h3>
        <ol>
          <li>
            These should be reconciled with icons so we can have an IconButton
            type where we could include custom iconography to the button with
            consistent results.
          </li>
        </ol>
      </div>
    </div>
  ))
  .add('Default', () => (
    <div>
      <StyledButton>Button Copy</StyledButton>
      <StyledButton size="small">Button Copy</StyledButton>
    </div>
  ))
  .add('Warn', () => (
    <div>
      <StyledButton type="warn">Button Copy</StyledButton>
      <StyledButton size="small" type="warn">
        Button Copy
      </StyledButton>
    </div>
  ))
  .add('CTA', () => (
    <div>
      <StyledButton type="cta">Button Copy</StyledButton>
      <StyledButton size="small" type="cta">
        Button Copy
      </StyledButton>
    </div>
  ))
