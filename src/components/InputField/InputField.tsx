import React from 'react';
import styled from 'styled-components';
import SearchSvg from 'assets/images/search.svg';

const Wrapper = styled.div`
  position: relative;
  margin: 20px auto 0;
  width: 250px;
  &::after {
    position: absolute;
    content: url(${SearchSvg});
    bottom: 6px;
    right: 8px;
    width: 20px;
    height: 20px;
    @media (min-width: 800px) {
      bottom: 10px;
    }
  }
  @media (min-width: 800px) {
    width: 400px;
  }
`;
const Label = styled.label`
  color: ${({ theme }) => theme.colors.dark};
  font-weight: 400;

  @media (min-width: 800px) {
    font-size: 2rem;
  }
`;
const Input = styled.input`
  background-color: ${({ theme }) => theme.colors.light};
  border: none;
  border-radius: 10px;
  display: block;
  width: 100%;
  padding: 8px 10px;
  font-family: inherit;
  @media (min-width: 800px) {
    font-size: 2rem;
  }
`;

interface IInputFieldProps {
  label: string;
  name: string;
  type: string;
  id: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

const InputField = ({ label, name, type, id, onChange }: IInputFieldProps) => {
  return (
    <Wrapper>
      <Label htmlFor={id}>{label}</Label>
      <Input name={name} id={id} type={type} onChange={onChange} />
    </Wrapper>
  );
};

export default InputField;
