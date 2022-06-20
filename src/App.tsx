import React from 'react';
import BookList from 'components/BookList/BookList';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from 'assets/styles/theme';
import GlobalStyle from 'assets/styles/GlobalStyle';
import Hero from 'components/Hero/Header';
import InputField from 'components/InputField/InputField';
import Button from 'components/Button/Button';
import { ReactComponent as StarSvg } from 'assets/images/star.svg';

const FilterButtons = styled.div`
  @media (min-width: 800px) {
    display: flex;
    width: fit-content;
    margin: 0 auto;
    gap: 0 10px;
  }
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Hero />
      <main>
        <InputField label="Search" name="search" type="text" id="label" />
        <FilterButtons>
          <Button>
            Show favourite <StarSvg />
          </Button>
          <Button>Filter by name</Button>
        </FilterButtons>
        <BookList />
      </main>
    </ThemeProvider>
  );
};

export default App;
