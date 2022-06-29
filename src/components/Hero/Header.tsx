import React from 'react';
import styled, { keyframes } from 'styled-components';
import { ReactComponent as BookSvg } from 'assets/images/book.svg';
import { ReactComponent as ArrowDown } from 'assets/images/arrow-down-header.svg';
import backgroundImage from 'assets/images/bg.jpg';

const waving = keyframes`
0% {
  transform: translateY(0px);
}
100% {
  transform: translateY(20px);
}
`;

const Wrapper = styled.header`
  color: ${(props) => props.theme.colors.light};
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: url(${backgroundImage});
  background-size: cover;
  background-position: top;
  box-shadow: inset 0 0 0 50vw rgba(17, 17, 17, 0.8);
  position: relative;
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: 600;
  margin: 0;

  @media (min-width: 800px) {
    font-size: 8rem;
  }
`;

const Paragraph = styled.p`
  margin: 0;

  @media (min-width: 800px) {
    font-size: 3rem;
  }
`;

const StyledArrowDown = styled(ArrowDown)`
  margin: 0;
  position: absolute;
  bottom: 50px;
  animation: ${waving} 2s ease-in-out infinite alternate;
`;

const StyledBookSvg = styled(BookSvg)`
  margin-left: 5px;
  width: 60px;
  height: 40px;
  @media (min-width: 800px) {
    width: 90px;
    height: 60px;
  }
`;

const Header = () => {
  return (
    <Wrapper>
      <Title>
        Bookworm
        <StyledBookSvg />
      </Title>
      <Paragraph>Discover many interesting books!</Paragraph>
      <StyledArrowDown />
    </Wrapper>
  );
};

export default Header;
