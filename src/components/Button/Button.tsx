import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface IButtonProps {
  children: ReactNode;
  onClick: () => void;
  inline?: boolean;
}

const ButtonWrapper = styled.button<Pick<IButtonProps, 'inline'>>`
  color: ${({ theme }) => theme.colors.dark};
  background-color: ${({ theme }) => theme.colors.light};
  border: none;
  font-size: 1.6rem;
  padding: 8px 18px;
  border-radius: 10px;
  display: ${({ inline }) => (inline ? 'inline' : 'flex')};
  align-items: center;
  gap: 5px;
  margin: 10px auto;
  cursor: pointer;
  font-family: inherit;
`;

const Button = ({ onClick, inline, children }: IButtonProps) => {
  return (
    <ButtonWrapper onClick={onClick} inline={inline}>
      {children}
    </ButtonWrapper>
  );
};

export default Button;
