import React from 'react';
import BookList from './components/BookList/BookList';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from './assets/styles/theme';
import GlobalStyle from './assets/styles/GlobalStyle';

const Hero = styled.header`
  color: ${(props) => props.theme.colors.dark};
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Hero>Hero</Hero>
      <BookList />
    </ThemeProvider>
  );
};

export default App;
