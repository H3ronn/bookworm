import React from 'react';
import BookList from 'components/BookList/BookList';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from 'assets/styles/theme';
import GlobalStyle from 'assets/styles/GlobalStyle';
import Hero from 'components/Hero/Header';
import SearchSvg from 'assets/images/search.svg';

const Wrapper = styled.div`
  position: relative;
  margin: 0 auto;
  width: 250px;
  &::after {
    position: absolute;
    content: url(${SearchSvg});
    bottom: 5px;
    right: 8px;
    width: 20px;
    height: 20px;
  }
`;
const Label = styled.label`
  color: ${({ theme }) => theme.colors.dark};
  font-size: 1.6rem;
  font-weight: 400;
`;
const Input = styled.input`
  background-color: ${({ theme }) => theme.colors.light};
  border: none;
  border-radius: 10px;
  display: block;
  width: 100%;
  padding: 7px 10px;
`;

interface IInputFieldProps {
  label: string;
  name: string;
  type: string;
  id: string;
}

const InputField = ({ label, name, type, id }: IInputFieldProps) => {
  return (
    <Wrapper>
      <Label htmlFor={id}>{label}</Label>
      <Input name={name} id={id} type={type} />
    </Wrapper>
  );
};

export default InputField;
