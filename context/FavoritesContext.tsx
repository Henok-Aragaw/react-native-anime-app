import React, { createContext, useState, useContext, ReactNode } from 'react';

interface FavoritesContextType {
  favorites: any[];
  addFavorite: (item: any) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<any[]>([]);

  const addFavorite = (item: any) => {
    setFavorites((prev) => [...prev, item]);
  };

  const removeFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((f) => f.mal_id !== id));
  };

  const isFavorite = (id: number) => favorites.some((f) => f.mal_id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within FavoritesProvider');
  return context;
};
