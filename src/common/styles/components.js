import { COLORS, UTILIZATION } from 'elements/colors/colors'
import { TYPOGRAPHY } from './variables'
const { $white, $emerald, $darksmoke } = COLORS
const { $shadowButton, $shadowButtonDown } = UTILIZATION
const { $fontstackDefault } = TYPOGRAPHY

export const mixin_fontBase = `
  font-family: 'proxima-nova', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', Helvetica,
    sans-serif !important;
`

export const mixin_pocketButton = `
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
export const mixin_pocketButtonStyled = `
  ${mixin_pocketButton}

  border-radius: 3px;
  box-shadow: ${$shadowButton};
  padding: 0.5em 1em;

  &:hover {
    box-shadow: ${$shadowButtonDown};
    transform: translateY(1px);
  }
`
export const mixin_pocketButtonYes = `
${mixin_pocketButtonStyled}

  background-color: ${$emerald};
  color: ${$white};

  &:hover {
    background-color: darken(${$emerald} 5%);
  }
`
export const mixin_pocketButtonNo = `
${mixin_pocketButtonStyled}

  background-color: ${$darksmoke};
  color: ${$white};

  &:hover {
    background-color: darken(${$darksmoke} 10%);
  }
`
