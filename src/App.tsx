import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

const App = () => {
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

  useEffect(() => {
    axios.get(`https://gnikdroy.pythonanywhere.com/api/book?page=${page}`).then(({ data }) => {
      setData(data.results);
      console.log(data.results[0]);
      console.log('strzal do api');
    });
  }, [page, setData]);

  useEffect(() => {
    console.log(favorite);
  }, [favorite]);

  return (
    <div>
      <h1>BookWorm</h1>
      <button onClick={prevPage}>Prev page</button>
      <button onClick={nextPage}>Next page</button>
      {!!data &&
        data.map((book, i) => {
          const imgLink = book.resources.find(
            (resource) => resource.type === 'image/jpeg' && resource.uri.includes('.medium.'),
          )?.uri;
          return (
            <div key={book.id}>
              <h4>{i + 1 + '. ' + book.title}</h4>
              <button onClick={() => toggleFavorite(book.id)}>
                {isFavorite(book.id) ? 'Delete from favorite' : 'Make as favourite'}
              </button>
              <img style={{ display: 'block' }} src={imgLink} alt="" />
              <p>{book.description}</p>
            </div>
          );
        })}
    </div>
  );
};

export default App;
