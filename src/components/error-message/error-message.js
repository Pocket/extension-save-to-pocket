import React from 'react'
import { css } from 'linaria'

const errorMessageStyles = css`
  color: red;
  font-size: 16px;
  padding: 15px 10px;
`

export const ErrorMessage = ({ message }) => {
  return (
    <section className={errorMessageStyles}>
      {message}
    </section>
  )
}
