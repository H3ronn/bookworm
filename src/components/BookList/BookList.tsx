import React, { useState, useEffect, useCallback } from 'react';
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

type filters = '-title' | 'title' | null;

interface getBooksOptions {
  search: string;
  filterBy: filters;
  page: number;
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
  const [filterBy, setFilterBy] = useState<filters>(null);
  const [searchValue, setSearchValue] = useState('');
  const [onlyFavorites, setOnlyFavorites] = useState(false);

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

  const getBooks = (options: getBooksOptions) => {
    console.log(options.page, options.search, options.filterBy);
    axios
      .get(
        `https://gnikdroy.pythonanywhere.com/api/book?page=${options.page}&search=${options.search}&ordering=${options.filterBy}`,
      )
      .then(({ data }) => {
        setBooks(data.results);
        console.log(data);
      });
  };

  const debouncedGetBooks = useCallback(debounce(getBooks, 1000), [page, filterBy]);

  const setFilters = () => {
    if (filterBy === null) {
      setFilterBy('title');
    } else if (filterBy === 'title') {
      setFilterBy('-title');
    } else {
      setFilterBy(null);
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
    setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setPage((prev) => prev - 1);
  };

  useEffect(() => {
    debouncedGetBooks({ search: searchValue, page, filterBy });
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
