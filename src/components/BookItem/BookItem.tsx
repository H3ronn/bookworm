import React from 'react';
import styled from 'styled-components';

interface IPropsBookItem {
  id: number;
  title: string;
  toggleFavorite: () => void;
  image: string;
  isFavorite: boolean;
  authors: string;
}

const Wrapper = styled.li`
  display: flex;
  gap: 0 10px;
  color: ${({ theme }) => theme.colors.dark};
  margin: 30px 10px;

  img {
    width: 100px;
    height: 150px;
  }

  button {
    font-family: inherit;
    font-size: 1.6rem;
    background: none;
    border: none;
    color: inherit;
    padding: 0;
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  h2 {
    font-size: 1.6rem;
    font-weight: 600;
  }
`;

const BookItem = ({ image, isFavorite, title, authors, toggleFavorite }: IPropsBookItem) => {
  return (
    <Wrapper style={isFavorite ? { border: '6px solid yellow' } : {}}>
      <img style={{ display: 'block' }} src={image} alt="" />
      <div>
        <button onClick={toggleFavorite}>
          {isFavorite ? 'Delete from favorite' : 'Mark as favorite'}
        </button>
        <h2>{title}</h2>
        <p>{authors}</p>
        <a href="">Read this book</a>
      </div>
    </Wrapper>
  );
};

export default BookItem;
