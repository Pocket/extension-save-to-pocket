import { Shades } from '../Colors/colors'
import { css } from 'react-emotion'

export const PanelBase = css`
  background-color: ${Shades.powder};
  /* border-color: ${Shades.white}; */
  /* border-width: 1px; */
  /* border-style: solid; */
  border-radius: 4px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  width: 100%;
  z-index: 100;
`

export const TooltipBase = css`
  display: inline-block;
  background-color: ${Shades.powder};
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.35);
`

export const DropDownBase = css`
  display: inline-block;
  background-color: ${Shades.white};
  box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.25);
`

export const MenuDivider = css`
  background-color: ${Shades.snow};
  content: '';
  display: block;
  height: 1px;
  margin: 5px auto;
  width: 90 %;
`

export const PopoverBase = css`
  ${PanelBase};
  display: inline-block;
  border-radius: 5px;
  width: auto;
`
