import styled, { css } from 'react-emotion'
import { Colors } from 'Elements/Colors/colors'

export const buttonReset = css`
  input:focus,
  button:focus,
  select:focus {
    outline: 0;
  }
  border: none;
  cursor: pointer;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;
  background: transparent;
  color: inherit;
  font: inherit;
  line-height: normal;
  text-align: inherit;
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
  -webkit-appearance: none;
  &::-moz-focus-inner {
    border: 0;
    padding: 0;
  }
  &:focus {
    outline: 0;
  }
  display: inline-flex;
  align-items: center;
`
export const buttonStyle = css`
  ${buttonReset};
  background-repeat: repeat-x;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.4);
  color: #222;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 400;
  line-height: 1;
  margin: 0;
  text-align: inherit;
  text-decoration: none;
  transition: background-position 0.1s linear;
  cursor: pointer;
  &:hover {
    background-position: 0 -15px;
  }
`

const buttonTypes = {
  default: css`
    ${buttonStyle};
    background-color: #f2f2f2;
    background-image: linear-gradient(to bottom, #ffffff 0, #f2f2f2 100%);
    border: 1px solid #d8d8d8;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
  `,
  warn: css`
    ${buttonStyle};
    background-color: #fcc164;
    background-image: linear-gradient(to bottom, #fbd95c 0, #fcc164 100%);
    border: 1px solid #e1b231;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
  `,
  cta: css`
    ${buttonStyle};
    background-color: #d3505a;
    background-image: linear-gradient(to bottom, #ee5f64 0, #d3505a 100%);
    border: 1px solid #d13644;
    text-shadow: 0 -1px 0 rgba(142, 4, 17, 0.5);
    color: #fff;
  `,
  colorModeLight: css`
    ${buttonStyle};
    background-color: #d3505a;
    background-image: linear-gradient(to bottom, #ee5f64 0, #d3505a 100%);
    border: 1px solid #d13644;
    text-shadow: 0 -1px 0 rgba(142, 4, 17, 0.5);
    color: #fff;
  `,
  colorModeSepia: css`
    ${buttonStyle};
    background-color: #d3505a;
    background-image: linear-gradient(to bottom, #ee5f64 0, #d3505a 100%);
    border: 1px solid #d13644;
    text-shadow: 0 -1px 0 rgba(142, 4, 17, 0.5);
    color: #fff;
  `,
  colorModeDark: css`
    ${buttonStyle};
    background-color: #d3505a;
    background-image: linear-gradient(to bottom, #ee5f64 0, #d3505a 100%);
    border: 1px solid #d13644;
    text-shadow: 0 -1px 0 rgba(142, 4, 17, 0.5);
    color: #fff;
  `
}

const buttonSizes = {
  default: css`
    padding: 8px 25px;
  `,
  small: css`
    padding: 6px 20px;
  `
}

const buttonWidths = {
  default: css`
    width: auto;
  `,
  full: css`
    width: 100%;
  `
}

export const ButtonLink = styled('button')`
  ${buttonReset};
  color: ${props => (props.color ? props.color : Colors.teal)};
  &:hover {
    color: ${Colors.emerald};
  }
`

export const StyledButton = props => css`
  ${props.type ? buttonTypes[props.type] : buttonTypes['default']};
  ${props.size ? buttonSizes[props.size] : buttonSizes['default']};
  ${props.full ? buttonWidths['full'] : buttonWidths['default']};
`
