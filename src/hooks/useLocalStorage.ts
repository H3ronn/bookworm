import React, { useEffect, useState } from 'react';

const getLocalStorageData = (key: string) => JSON.parse(localStorage.getItem(key) || '[]');

export const useLocalStorage = <T>(key: string): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [state, setState] = useState(getLocalStorageData(key));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, setState];
};
// import { useEffect, useState } from 'react';

// const getLocalStorageData = (key, defaultValue = []) => JSON.parse(localStorage.getItem(key)) || defaultValue;

// export const useLocalStorage = (key, defaultValue) => {
//   const [value, setValue] = useState(getLocalStorageData(key, defaultValue));

//   useEffect(() => {
//     localStorage.setItem(key, JSON.stringify(value));
//   }, [key, value]);

//   return [value, setValue];
// };
