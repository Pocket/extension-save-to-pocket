import React from 'react'
import { css } from 'linaria'

const previewWrapper = css`
  display: flex;
  background: #F3F3F3;
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;

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
    line-height: 20px;
    color: #1A1A1A;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: #1A1A1A;
  }
`

export const ItemPreview = ({ title, thumbnail, publisher }) => {
  return (title && publisher) ? (
    <div className={previewWrapper}>
      {thumbnail ? <img src={thumbnail} /> : null}
      <div>
        <h3>{title}</h3>
        <p>{publisher}</p>
      </div>
    </div>
  ) : null
}
