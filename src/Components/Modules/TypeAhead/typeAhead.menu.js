import styled from 'react-emotion'
import { Shades } from 'Elements/Colors/colors'

export const TypeAheadMenu = styled('div')`
  background-color: ${Shades.white};
  max-height: 11.4rem;
  overflow-y: auto;
  overflow-x: hidden;
  border: 1px solid ${Shades.gray};
  outline: 0;
  transition: opacity 0.1s ease;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
  box-sizing: border-box;
  position: absolute;
  left: 0;
  padding: 0.5rem 0;
  width: 100%;
  z-index: 10;
  &::-webkit-scrollbar {
    display: none;
  }
`
