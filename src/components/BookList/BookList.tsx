import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookItem from '../BookItem/BookItem';
import { debounce } from 'lodash';

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
    <div>
      <h1>BookWorm</h1>
      <input name="search" id="search" onChange={searchInputChange} />
      <button onClick={prevPage}>Prev page</button>
      <button onClick={nextPage}>Next page</button>
      {!!books &&
        books.map(({ id, description, resources, title }) => {
          const imgLink = getImageLink(resources);
          return (
            <BookItem
              key={id}
              id={id}
              title={title}
              toggleFavorite={toggleFavorite}
              image={imgLink}
              description={description}
              isFavorite={isFavorite(id)}
            />
          );
        })}
    </div>
  );
};

export default BookList;
