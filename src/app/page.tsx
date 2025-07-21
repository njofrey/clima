'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  getWeatherByCoords,
  getWeatherByCity,
  getForecastByCoords,
} from '../lib/weather';
import { WeatherData, ForecastData } from '../types';
import CurrentWeather from '../components/CurrentWeather';
import Search from '../components/Search';
import Forecast from '../components/Forecast';

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchWeatherAndForecast = async (lat: number, lon: number) => {
    try {
      const weatherData = await getWeatherByCoords(lat, lon);
      const forecastData = await getForecastByCoords(lat, lon);
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError('Error al obtener los datos del clima.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeatherAndForecast(position.coords.latitude, position.coords.longitude);
      },
      (err) => {
        setError('No se pudo acceder a la geolocalización.');
        console.error(err);
        setLoading(false);
      }
    );
  }, []);

  const handleSearch = async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const weatherData = await getWeatherByCity(city);
      setWeather(weatherData);
      if (weatherData) {
        const forecastData = await getForecastByCoords(weatherData.coord.lat, weatherData.coord.lon);
        setForecast(forecastData);
      }
    } catch (err) {
      setError('No se pudo encontrar la ciudad.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-4">Clima Vivo</h1>
        <Search onSearch={handleSearch} />
        {loading && <p className="text-center">Cargando...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-4"
        >
          {weather && <CurrentWeather data={weather} />}
          {forecast && <Forecast data={forecast} />}
        </motion.div>
      </div>
    </main>
  );
}
