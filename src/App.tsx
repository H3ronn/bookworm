import React from 'react';
import BookList from 'components/BookList/BookList';
import { ThemeProvider } from 'styled-components';
import { theme } from 'assets/styles/theme';
import GlobalStyle from 'assets/styles/GlobalStyle';
import Hero from 'components/Hero/Header';
import InputField from 'components/InputField/InputField';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Hero />
      <main>
        <InputField label="Search" name="search" type="text" id="label" />
        <BookList />
      </main>
    </ThemeProvider>
  );
};

export default App;
