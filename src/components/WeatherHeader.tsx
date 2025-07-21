'use client';

import { useState } from 'react';

interface WeatherHeaderProps {
  onSearch: (city: string) => void;
  // Podríamos añadir la zona horaria para mostrar la hora correcta
}

export default function WeatherHeader({ onSearch }: WeatherHeaderProps) {
  const [city, setCity] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (city) {
      onSearch(city);
    }
  };

  return (
    <header>
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Buscar otra ciudad..."
          className="flex-grow p-2 rounded-full bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50"
        />
        <button
          type="submit"
          className="p-2 px-4 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          Buscar
        </button>
      </form>
      <div className="mt-4 text-lg">
        {/* Aquí irá la hora local */}
        <p>10:30 AM</p>
      </div>
    </header>
  );
}
