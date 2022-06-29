import styled from 'styled-components';
import { ReactComponent as ArrowUpSvg } from 'assets/images/arrow-up.svg';

type DirectionType = 'up' | 'down' | 'left' | 'right';

interface IArrow {
  direction: DirectionType;
}

export const Arrow = styled(ArrowUpSvg)<IArrow>`
  fill: ${({ theme }) => theme.colors.dark};
  width: 20px;

  transform: ${({ direction }) => {
    if (direction === 'down') return 'rotate(180deg)';
    if (direction === 'left') return 'rotate(270deg)';
    if (direction === 'right') return 'rotate(90deg)';
  }};
  /* transform: ${({ direction }) =>
    direction === 'down'
      ? 'rotate(180deg)'
      : null || direction === 'left'
      ? 'rotate(270deg)'
      : null || direction === 'right'
      ? 'rotate(90deg)'
      : null}; */
`;
