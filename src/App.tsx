import React from 'react';
import BookList from 'components/BookList/BookList';
import { ThemeProvider } from 'styled-components';
import { theme } from 'assets/styles/theme';
import GlobalStyle from 'assets/styles/GlobalStyle';
import Hero from 'components/Hero/Header';

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
