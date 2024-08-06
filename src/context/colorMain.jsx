'use client';

import React, { useState, useEffect, createContext } from 'react';

import { setStorage } from 'src/hooks/use-local-storage';

import { localStorageGetItem } from 'src/utils/storage-available';

export const ColorContext = createContext();

const ColorProvider = ({ children }) => {
  const [mainColor, setMainColor] = useState();

  useEffect(() => {
    try {
      const storedColor =
        localStorageGetItem('mainColor') &&
        JSON.parse(localStorageGetItem('mainColor', JSON.stringify('info')));
      if (storedColor) {
        setMainColor(storedColor);
      } else {
        setMainColor('info');
      }
    } catch {
      setMainColor('info');
    }
  }, []);

  const setColor = (color) => {
    console.log('This is the requested color: ', color);
    setStorage('mainColor', color);
    setMainColor(color);
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  return <ColorContext.Provider value={{ mainColor, setColor }}>{children}</ColorContext.Provider>;
};

export default ColorProvider;
