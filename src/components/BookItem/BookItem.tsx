import React from 'react';

interface IPropsBookItem {
  id: number;
  title: string;
  toggleFavorite: (id: number) => void;
  image: string | undefined;
  description: string;
  isFavorite: boolean;
}

const BookItem = (props: IPropsBookItem) => {
  return (
    <div style={props.isFavorite ? { border: '6px solid yellow' } : {}}>
      <h2>{props.title}</h2>
      <button onClick={() => props.toggleFavorite(props.id)}>
        {props.isFavorite ? 'Delete from favorite' : 'Make as favourite'}
      </button>
      <img style={{ display: 'block' }} src={props.image} alt="" />
      <p>{props.description}</p>
    </div>
  );
};

export default BookItem;
