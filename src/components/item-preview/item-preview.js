import React from 'react'
import { css, cx } from 'linaria'

const previewWrapper = css`
  display: flex;
  background: #F3F3F3;
  padding: 10px;
  border-radius: 4px;

  img {
    width: 40px;
    height: 40px;
    margin-right: 20px;
    border-radius: 4px;
  }

  div {
    text-align: left;
  }

  h3 {
    margin: 0 0 4px;
    font-size: 16px;
    font-weight: 600;
    color: #1A1A1A;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: #1A1A1A;
  }
`

export const ItemPreview = ({ title, thumbnail, publisher }) => {
  return (
    <div className={previewWrapper}>
      {thumbnail ? <img src={thumbnail} /> : null}
      <div>
        <h3>{title}</h3>
        <p>{publisher}</p>
      </div>
    </div>
  )
}
