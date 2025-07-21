'use client';

import { useState } from 'react';

interface SearchProps {
  onSearch: (city: string) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const [city, setCity] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (city) {
      onSearch(city);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Buscar ciudad..."
        className="flex-grow p-2 rounded bg-gray-700 text-white placeholder-gray-400"
      />
      <button
        type="submit"
        className="p-2 rounded bg-blue-600 hover:bg-blue-700 transition-colors"
      >
        Buscar
      </button>
    </form>
  );
} 