import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookItem from '../BookItem/BookItem';
import { debounce } from 'lodash';
import InputField from 'components/InputField/InputField';
import Button from 'components/Button/Button';
import { ReactComponent as StarSvg } from 'assets/images/star.svg';
import styled from 'styled-components';
import { getAuthorName } from 'helpers/getAuthorName';

interface IResources {
  id: number;
  uri: string;
  type: string;
}

export interface IAgents {
  id: number;
  person: string;
  type: string;
}

interface IBook {
  id: number;
  description: string;
  title: string;
  subjects: string[];
  resources: IResources[];
  agents: IAgents[];
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

  const getAuthors = (agents: IAgents[]): string => {
    const authors = agents.filter((agent) => agent.type === 'Author');

    if (authors.length <= 0) return '';

    if (authors.length === 1) {
      return getAuthorName(agents[0]);
    }

    const agentsListString = agents.reduce((acc, curr) => {
      const authorName = getAuthorName(curr);
      if (acc.length <= 1) {
        return authorName;
      }
      return acc + ', ' + authorName;
    }, '');
    return agentsListString;
  };

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setPage((prev) => prev - 1);
  };

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
        <Button
          onClick={() => {
            console.log('show');
          }}
        >
          Show favourite <StarSvg />
        </Button>
        <Button
          onClick={() => {
            console.log('filter');
          }}
        >
          Filter by name
        </Button>
      </FilterButtons>
      <Button onClick={prevPage} inline={true}>
        Prev page
      </Button>
      <Button onClick={nextPage} inline={true}>
        Next page
      </Button>
      {!!books &&
        books.map(({ id, resources, title, agents }) => {
          const imgLink = getImageLink(resources);
          return (
            <BookItem
              key={id}
              id={id}
              title={title}
              toggleFavorite={toggleFavorite}
              image={imgLink}
              isFavorite={isFavorite(id)}
              authors={getAuthors(agents)}
            />
          );
        })}
    </main>
  );
};

export default BookList;
