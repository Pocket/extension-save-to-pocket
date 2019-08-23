import React from 'react'
import { localize } from '../../../../common/_locales/locales'
import { COLORS } from '../../../../common/styles/colors'
import styled from '@emotion/styled'
const { $overcast } = COLORS

const LoaderPanel = styled.div`
  display: block;
  font-size: 12px;
  padding: 15px 0 20px;
  text-align: center;
`

const LoaderWrapper = styled.div`
    display: inline-block;
    width: 30px;
  }
`
const LoaderAnimation = styled.div`
    display: inline-block;
    margin: 0 auto;
    position: relative;
    transform: translateY(-13px);

    > div {
      animation-fill-mode: both;
      border-radius: 100%;
      left: 0;
      position: absolute;
      top: 0;

      &:first-child {
        animation: scale 1.25s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
        background: ${$overcast};
        height: 10px;
        left: -5px;
        top: 4px;
        width: 10px;
      }

      &:last-child {
        animation: pocket_ext_rotate_animation 1s 0s
          cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
        animation-duration: 1.25s;
        background: transparent;
        border: 1px solid ${$overcast};
        border-color: $overcast transparent ${$overcast} transparent;
        height: 20px;
        left: -11px;
        position: absolute;
        top: -2px;
        width: 20px;
      }
    }
  }

  :global {
    @keyframes pocket_ext_rotate_animation {
      0% {
        transform: rotate(0deg) scale(1);
      }

      50% {
        transform: rotate(180deg) scale(0.5);
      }

      100% {
        transform: rotate(360deg) scale(1);
      }
    }
`
export default function Loader() {
  return (
    <LoaderPanel>
      <LoaderWrapper>
        <LoaderAnimation>
          <div />
          <div />
        </LoaderAnimation>
      </LoaderWrapper>
      {localize('recommendations', 'loading')}
    </LoaderPanel>
  )
}