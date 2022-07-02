import React, { useState, useEffect, useCallback } from 'react';
import BookItem from '../BookItem/BookItem';
import InputField from 'components/InputField/InputField';
import Button from 'components/Button/Button';
import { ReactComponent as StarSvg } from 'assets/images/star.svg';
import { getAuthorName } from 'helpers/getAuthorName';
import { Filters, getBooks } from 'api/books';
import { asyncDebounce } from 'helpers/asyncDebounce';
import Loading from 'components/Loading/Loading';
import { BookList, FilterButtons, PagesControls } from './Books.styles';
import { Arrow } from 'components/Arrow/Arrow';
import { useLocalStorage } from 'hooks/useLocalStorage';

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

const Books = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  // const [favorites, setFavorites] = useState<IBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [filterBy, setFilterBy] = useState<Filters>('');
  const [prevPageExist, setPrevPageExist] = useState(false);
  const [nextPageExist, setNextPageExist] = useState(true);

  const [favorites, setFavorites] = useLocalStorage<IBook[]>('favorites');

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
    if (filterBy === '') {
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
    setBooks([]);
    (async () => {
      const data = await debouncedGetBooks({
        search: searchValue,
        page,
        filterBy,
      });
      if (typeof data === 'string') {
        console.log('failed');
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
        <Button onClick={setFilters}>
          Filter by name
          {filterBy === 'title' ? <Arrow direction="down" /> : null}
          {filterBy === '-title' ? <Arrow direction="up" /> : null}
        </Button>
      </FilterButtons>
      <PagesControls>
        <Button onClick={prevPage}>Prev page</Button>
        <p>Page: {page}</p>
        <Button onClick={nextPage}>Next page</Button>
      </PagesControls>
      {isLoading ? <Loading /> : null}
      {!isLoading && books.length === 0 ? <p>No matching books</p> : null}
      <BookList>
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
      </BookList>
    </main>
  );
};

export default Books;
