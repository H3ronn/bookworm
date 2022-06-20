import React from 'react';
import BookList from 'components/BookList/BookList';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from 'assets/styles/theme';
import GlobalStyle from 'assets/styles/GlobalStyle';
import Hero from 'components/Hero/Header';
import InputField from 'components/InputField/InputField';
import Button from 'components/Button/Button';
import { ReactComponent as StarSvg } from 'assets/images/star.svg';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Hero />
      <BookList />
    </ThemeProvider>
  );
};

export default App;
