import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import BookItem from '../BookItem/BookItem';
import { debounce } from 'lodash';
import InputField from 'components/InputField/InputField';
import Button from 'components/Button/Button';
import { ReactComponent as StarSvg } from 'assets/images/star.svg';
import styled from 'styled-components';
import { getAuthorName } from 'helpers/getAuthorName';
import { Filters, getBooks, GetBooksResponse } from 'components/api/books';
import { asyncDebounce } from 'helpers/asyncDebounce';

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
  const [books, setBooks] = useState<IBook[]>([]);
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState<IBook[]>([]);
  const [filterBy, setFilterBy] = useState<Filters>('');
  const [searchValue, setSearchValue] = useState('');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [prevPageExist, setPrevPageExist] = useState(false);
  const [nextPageExist, setNextPageExist] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const toggleFavorite = (book: IBook) => {
    if (favorites.includes(book)) {
      const filteredFavorite = favorites.filter(({ id }) => id !== book.id);
      setFavorites(filteredFavorite);
    } else {
      setFavorites((prev) => [...prev, book]);
    }
  };

  const toggleOnlyFavorites = () => {
    setOnlyFavorites((prev) => !prev);
  };

  const isFavorite = (id: number): boolean => {
    return !!favorites.find((book) => book.id === id);
  };

  const getImageLink = (resources: IResources[]): string => {
    const resourceWithImage = resources.find(
      (resource) => resource.type === 'image/jpeg' && resource.uri.includes('.medium.'),
    );

    return resourceWithImage ? resourceWithImage.uri : '';
  };

  const searchInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  const setFilters = () => {
    if (filterBy === null) {
      setFilterBy('title');
    } else if (filterBy === 'title') {
      setFilterBy('-title');
    } else {
      setFilterBy('');
    }
  };

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
    if (nextPageExist && !isLoading) {
      console.log('click');
      setPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (prevPageExist && !isLoading) {
      setPage((prev) => prev - 1);
    }
  };

  const debouncedGetBooks = useCallback(asyncDebounce(getBooks, 1000), []);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const data = await debouncedGetBooks({
        search: searchValue,
        page,
        filterBy,
      });
      if (typeof data === 'string') {
        console.log('wyjebka');
      } else {
        //idk how to fix return type undefined when wrapping getBooks to debounce
        // fixed by async friendly debounce? I will back later when a will be stronger
        setBooks(data.results);

        setPrevPageExist(!!data.previous);
        setNextPageExist(!!data.next);

        setIsLoading(false);
      }
    })();
  }, [searchValue, page, filterBy]);

  return (
    <main>
      <InputField
        label="Search"
        name="search"
        type="text"
        id="label"
        onChange={searchInputChange}
        value={searchValue}
      />
      <FilterButtons>
        <Button onClick={toggleOnlyFavorites}>
          Show favourite <StarSvg />
        </Button>
        <Button onClick={setFilters}>Filter by name</Button>
      </FilterButtons>
      <Button onClick={prevPage} inline>
        Prev page
      </Button>
      <p style={{ display: 'inline-block', padding: '0 10px' }}>Page: {page}</p>
      <Button onClick={nextPage} inline>
        Next page
      </Button>
      {books.length && !onlyFavorites
        ? books.map((book) => {
            const { id, resources, title, agents } = book;
            if (!title) return;
            const imgLink = getImageLink(resources);
            return (
              <BookItem
                key={id}
                id={id}
                title={title}
                toggleFavorite={() => toggleFavorite(book)}
                image={imgLink}
                isFavorite={isFavorite(id)}
                authors={getAuthors(agents)}
              />
            );
          })
        : null}
      {onlyFavorites && favorites.length
        ? favorites.map((book) => {
            const { id, resources, title, agents } = book;
            if (!title) return;
            const imgLink = getImageLink(resources);
            return (
              <BookItem
                key={id}
                id={id}
                title={title}
                toggleFavorite={() => toggleFavorite(book)}
                image={imgLink}
                isFavorite={isFavorite(id)}
                authors={getAuthors(agents)}
              />
            );
          })
        : null}
    </main>
  );
};

export default BookList;
