import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookItem from '../BookItem/BookItem';

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
  const [data, setData] = useState<IBook[] | null>(null);
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
      const filteredFavourite = favorite.filter((favId) => favId !== bookId);
      setFavorite(filteredFavourite);
    } else {
      setFavorite((prev) => [...prev, bookId]);
    }
  };

  const isFavorite = (id: number): boolean => {
    return favorite.includes(id);
  };

  const getImageLink = (resources: IResources[]): string | undefined => {
    const resourceWithImage = resources.find(
      (resource) => resource.type === 'image/jpeg' && resource.uri.includes('.medium.'),
    );
    if (resourceWithImage) {
      return resourceWithImage.uri;
    }
    return undefined;
  };

  useEffect(() => {
    axios.get(`https://gnikdroy.pythonanywhere.com/api/book?page=${page}`).then(({ data }) => {
      setData(data.results);
    });
  }, [page, setData]);

  return (
    <div>
      <h1>BookWorm</h1>
      <button onClick={prevPage}>Prev page</button>
      <button onClick={nextPage}>Next page</button>
      {!!data &&
        data.map((book) => {
          const imgLink = getImageLink(book.resources);
          return (
            <BookItem
              key={book.id}
              id={book.id}
              title={book.title}
              toggleFavorite={toggleFavorite}
              image={imgLink}
              description={book.description}
              isFavorite={isFavorite(book.id)}
            />
          );
        })}
    </div>
  );
};

export default BookList;
