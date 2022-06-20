import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface IButtonProps {
  children: ReactNode;
}

const Wrapper = styled.button`
  color: ${({ theme }) => theme.colors.dark};
  background-color: ${({ theme }) => theme.colors.light};
  border: none;
  font-size: 1.6rem;
  padding: 8px 18px;
  border-radius: 10px;
  display: block;
  margin: 10px auto;
  cursor: pointer;
  font-family: inherit;
`;

const Button = ({ children }: IButtonProps) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Button;
