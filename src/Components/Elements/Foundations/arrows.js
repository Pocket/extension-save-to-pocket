import styled, { css } from 'react-emotion'
export const ARROW_WIDTH = 8
export const ARROW_OFFSET = 9

const ArrowStyle = css`
  display: block;
  width: 0;
  height: 0;
  position: absolute;

  &:before {
    position: absolute;
    z-index: 1;
    display: block;
    width: 0;
    height: 0;
    content: '';
  }
`

const ArrowUp = props => css`
  ${ArrowStyle};
  top: -${ARROW_OFFSET}px;
  ${props.offset && props.offset > 0 ? { left: props.offset + 'px' } : ''};
  ${props.offset && props.offset < 0
    ? { right: -1 * props.offset + 'px' }
    : ''};
  ${!props.offset ? { left: '50%', transform: 'translateX(-50%)' } : ''};
  border-left: ${ARROW_OFFSET}px solid transparent;
  border-right: ${ARROW_OFFSET}px solid transparent;
  border-bottom: ${ARROW_OFFSET}px solid ${props.theme.chip.border};
  &:before {
    left: 0;
    top: 1px;
    transform: translateX(-50%);
    border-left: ${ARROW_WIDTH}px solid transparent;
    border-right: ${ARROW_WIDTH}px solid transparent;
    border-bottom: ${ARROW_WIDTH}px solid ${props.theme.card.background};
  }
`

const ArrowRight = props => css`
  ${ArrowStyle};
  right: -${ARROW_OFFSET}px;
  ${props.offset && props.offset > 0 ? { top: props.offset + 'px' } : ''};
  ${props.offset && props.offset < 0 ? { bottom: -props.offset + 'px' } : ''};
  ${!props.offset ? { top: '50%', transform: 'translateY(-50%)' } : ''};
  border-left: ${ARROW_OFFSET}px solid ${props.theme.chip.border};
  border-top: ${ARROW_OFFSET}px solid transparent;
  border-bottom: ${ARROW_OFFSET}px solid transparent;
  &:before {
    top: 0;
    right: 1px;
    transform: translateY(-50%);
    border-left: ${ARROW_WIDTH}px solid ${props.theme.card.background};
    border-top: ${ARROW_WIDTH}px solid transparent;
    border-bottom: ${ARROW_WIDTH}px solid transparent;
  }
`
const ArrowDown = props => css`
  ${ArrowStyle};
  bottom: -${ARROW_OFFSET}px;
  ${props.offset && props.offset > 0 ? { left: props.offset + 'px' } : ''};
  ${props.offset && props.offset < 0 ? { right: -props.offset + 'px' } : ''};
  ${!props.offset ? { left: '50%', transform: 'translateX(-50%)' } : ''};
  border-left: ${ARROW_OFFSET}px solid transparent;
  border-right: ${ARROW_OFFSET}px solid transparent;
  border-top: ${ARROW_OFFSET}px solid ${props.theme.chip.border};
  &:before {
    left: 0;
    bottom: 1px;
    transform: translateX(-50%);
    border-left: ${ARROW_WIDTH}px solid transparent;
    border-right: ${ARROW_WIDTH}px solid transparent;
    border-top: ${ARROW_WIDTH}px solid ${props.theme.card.background};
  }
`
const ArrowLeft = props => css`
  ${ArrowStyle};
  ${props.offset && props.offset > 0 ? { top: props.offset + 'px' } : ''};
  ${props.offset && props.offset < 0 ? { bottom: -props.offset + 'px' } : ''};
  ${!props.offset ? { top: '50%', transform: 'translateY(-50%)' } : ''};
  left: -${ARROW_OFFSET}px;
  border-right: ${ARROW_OFFSET}px solid ${props.theme.chip.border};
  border-top: ${ARROW_OFFSET}px solid transparent;
  border-bottom: ${ARROW_OFFSET}px solid transparent;
  &:before {
    top: 0;
    left: 1px;
    transform: translateY(-50%);
    border-right: ${ARROW_WIDTH}px solid ${props.theme.card.background};
    border-top: ${ARROW_WIDTH}px solid transparent;
    border-bottom: ${ARROW_WIDTH}px solid transparent;
  }
`
export const Arrow = styled('div')`
  ${props => (props.up ? ArrowUp : '')};
  ${props => (props.right ? ArrowRight : '')};
  ${props => (props.down ? ArrowDown : '')};
  ${props => (props.left ? ArrowLeft : '')};
`

export function arrowDirection(direction) {
  const directions = {
    up: { down: true },
    right: { left: true },
    down: { up: true },
    left: { right: true }
  }

  return directions[direction]
}
