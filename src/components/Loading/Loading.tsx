import React from 'react';
import styled, { keyframes } from 'styled-components';

const Wrapper = styled.div`
  height: 100vh;
`;

const slide = keyframes`
	0% {transform:translateX(-100%)}
	100% {transform:translateX(100%)}
`;

const Placeholder = styled.div`
  height: 150px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.light};
  margin: 10px 0;
  position: relative;
  overflow: hidden;

  &:after {
    content: '';
    top: 0;
    transform: translateX(100%);
    width: 100%;
    height: 150px;
    position: absolute;
    animation: ${slide} 1s infinite;

    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.8) 50%,
      rgba(128, 186, 232, 0) 99%,
      rgba(125, 185, 232, 0) 100%
    );
  }
`;

const Loading = () => {
  return (
    <Wrapper>
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
    </Wrapper>
  );
};

export default Loading;
