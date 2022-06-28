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

interface getBooksOptions {
  search: string;
  filterBy: '-title' | 'title' | null;
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
  const [books, setBooks] = useState<IBook[] | null>(null);
  const [page, setPage] = useState(1);
  const [favorite, setFavorite] = useState<number[]>([]);
  const [filterBy, setFilterBy] = useState<'-title' | 'title' | null>(null);
  const [searchValue, setSearchValue] = useState('');

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
        <Button
          onClick={() => {
            console.log('show');
          }}
        >
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
      {!!books &&
        books.map(({ id, resources, title, agents }) => {
          if (!title) return;
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
