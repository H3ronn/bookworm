import React from 'react';

interface IPropsBookItem {
  id: number;
  title: string;
  toggleFavorite: (id: number) => void;
  image: string;
  description: string;
  isFavorite: boolean;
}

const BookItem = ({
  description,
  id,
  image,
  isFavorite,
  title,
  toggleFavorite,
}: IPropsBookItem) => {
  return (
    <div style={isFavorite ? { border: '6px solid yellow' } : {}}>
      <h2>{title}</h2>
      <button onClick={() => toggleFavorite(id)}>
        {isFavorite ? 'Delete from favorite' : 'Make as favourite'}
      </button>
      <img style={{ display: 'block' }} src={image} alt="" />
      <p>{description}</p>
    </div>
  );
};

export default BookItem;
