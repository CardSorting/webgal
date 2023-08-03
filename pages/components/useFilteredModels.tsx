// useFilteredModels.ts
import { useState } from 'react';

interface Model {
  name: string;
  style: string;
  popularity: number;
  rating: number;
  instances: number;
}

const useFilteredModels = (models: Model[]) => {
  const [search, setSearch] = useState('');
  const [styleFilter, setStyleFilter] = useState('all');
  const [sortFilter, setSortFilter] = useState('A-Z');

  let filteredModels = models.filter(model => model.name.toLowerCase().includes(search.toLowerCase()));
  
  if (styleFilter !== 'all') filteredModels = filteredModels.filter(model => model.style === styleFilter);
  if (sortFilter === 'most popular') filteredModels.sort((a, b) => b.popularity - a.popularity);
  else if (sortFilter === 'top rated') filteredModels.sort((a, b) => b.rating - a.rating);
  else filteredModels.sort((a, b) => a.name.localeCompare(b.name));

  return {
    search,
    setSearch,
    styleFilter,
    setStyleFilter,
    sortFilter,
    setSortFilter,
    filteredModels,
  };
};

export default useFilteredModels;