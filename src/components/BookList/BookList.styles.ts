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
