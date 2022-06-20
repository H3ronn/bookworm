import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookItem from '../BookItem/BookItem';
import { debounce } from 'lodash';
import InputField from 'components/InputField/InputField';
import Button from 'components/Button/Button';
import { ReactComponent as StarSvg } from 'assets/images/star.svg';
import styled from 'styled-components';

interface IResources {
  id: number;
  uri: string;
  type: string;
}

interface IBook {
  id: number;
  description: string;
  title: string;
  subjects: string[];
  resources: IResources[];
}

const FilterButtons = styled.div`
  @media (min-width: 800px) {
    display: flex;
    width: fit-content;
    margin: 0 auto;
    gap: 0 10px;
  }
`;

const BookList = () => {
  const [books, setBooks] = useState<IBook[] | null>(null);
  const [page, setPage] = useState(1);
  const [favorite, setFavorite] = useState<number[]>([]);

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setPage((prev) => prev - 1);
  };

  const toggleFavorite = (bookId: number) => {
    if (favorite.includes(bookId)) {
      const filteredFavorite = favorite.filter((favId) => favId !== bookId);
      setFavorite(filteredFavorite);
    } else {
      setFavorite((prev) => [...prev, bookId]);
    }
  };

  const isFavorite = (id: number): boolean => {
    return favorite.includes(id);
  };

  const getImageLink = (resources: IResources[]): string => {
    const resourceWithImage = resources.find(
      (resource) => resource.type === 'image/jpeg' && resource.uri.includes('.medium.'),
    );

    return resourceWithImage ? resourceWithImage.uri : '';
  };

  const searchInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    getBooks(e.currentTarget.value);
  };

  const getBooks = debounce((searchValue = '') => {
    axios
      .get(`https://gnikdroy.pythonanywhere.com/api/book?page=${page}&search=${searchValue}`)
      .then(({ data }) => {
        setBooks(data.results);
      });
  }, 1000);

  useEffect(() => {
    getBooks();
  }, [page]);

  return (
    <main>
      <InputField
        label="Search"
        name="search"
        type="text"
        id="label"
        onChange={searchInputChange}
      />
      <FilterButtons>
        <Button>
          Show favourite <StarSvg />
        </Button>
        <Button>Filter by name</Button>
      </FilterButtons>
      {!!books &&
        books.map(({ id, resources, title }) => {
          const imgLink = getImageLink(resources);
          return (
            <BookItem
              key={id}
              id={id}
              title={title}
              toggleFavorite={toggleFavorite}
              image={imgLink}
              isFavorite={isFavorite(id)}
            />
          );
        })}
    </main>
  );
};

export default BookList;
