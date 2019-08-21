import { css } from '@emotion/core'
import { COLORS } from './colors'
import { TYPOGRAPHY } from './variables'
const {
  $shadow,
  $powder,
  $white,
  $night,
  $pitch,
  $emerald,
  $shadowButton,
  $shadowDown,
  $darksmoke,
  $shadowButtonDown
} = COLORS
const { $fontstackDefault } = TYPOGRAPHY

export const mixin_fontBase = css`
  font-family: 'proxima-nova', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', Helvetica,
    sans-serif !important;
`
const mixin_pocketPanel = css`
  background-color: ${$powder}
  border-color: ${$white}
  border-radius: 4px;
  border-style: solid;
  border-width: 2px;
  box-shadow: ${$shadow}
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  width: 100%;
  z-index: 100;

  .darkMode & {
    background-color: ${$night}
    border-color: ${$pitch}
  }
`

export const mixin_pocketButton = css`
  all: unset;
  background-color: none;
  border: 0;
  cursor: pointer;
  display: inline-block;
  font-family: ${$fontstackDefault};
  padding: 0;
  -webkit-user-select: none; /* for button */
  -moz-user-select: none;
  -ms-user-select: none;
`
const mixin_pocketButtonStyled = css`
  ${mixin_pocketButton}

  border-radius: 3px;
  box-shadow: ${$shadowButton};
  padding: 0.5em 1em;

  &:hover {
    box-shadow: ${$shadowButtonDown};
    transform: translateY(1px);
  }
`
const mixin_pocketButtonYes = css`
${mixin_pocketButtonStyled}

  background-color: ${$emerald}
  color: ${$white}

  &:hover {
    background-color: darken(${$emerald} 5%);
  }
`
const mixin_pocketButtonNo = css`
${mixin_pocketButtonStyled}

  background-color: ${$darksmoke}
  color: ${$white}

  &:hover {
    background-color: darken(${$darksmoke} 10%);
  }
`
const mixin_hoverDown = css`
  box-shadow: ${$shadowDown};
  transform: translateY(1px);
`

export const $narrow = '700px'
export const $mobile = '320px'

export const mixin_narrow = css`
  @media (min-width: #{$mobile}) and (max-width: #{${$narrow} - 1px}) {
    @content;
  }
`
export const mixin_mobile = css`
  @media (max-width: #{${$mobile} - 1px}) {
    @content;
  }
}
`
