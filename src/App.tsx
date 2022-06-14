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

  const nextPage = (): void => {
    setPage((prev) => prev + 1);
  };

  const prevPage = (): void => {
    setPage((prev) => prev - 1);
  };

  useEffect(() => {
    axios.get(`https://gnikdroy.pythonanywhere.com/api/book?page=${page}`).then(({ data }) => {
      setData(data.results);
      console.log('strzal do api');
    });
  }, [page, setData]);
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
              <img src={imgLink} alt="" />
            </div>
          );
        })}
    </div>
  );
};

export default App;
