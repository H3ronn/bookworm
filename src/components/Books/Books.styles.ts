import styled from 'styled-components';

export const FilterButtons = styled.div`
  @media (min-width: 800px) {
    display: flex;
    width: fit-content;
    margin: 0 auto;
    gap: 0 10px;
  }
`;

export const PagesControls = styled.div`
  display: flex;
  p {
    color: ${({ theme }) => theme.colors.dark};
    white-space: nowrap;
  }
  max-width: 400px;
  margin: 0 auto;
`;

export const BookList = styled.ul`
  padding: 0;

  @media (min-width: 700px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 1000px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
