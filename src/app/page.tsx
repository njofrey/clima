'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  getWeatherByCoords,
  getWeatherByCity,
  getForecastByCoords,
} from '../lib/weather';
import { WeatherData, ForecastData } from '../types';
import WeatherHeader from '../components/WeatherHeader';
import WeatherMainCard from '../components/WeatherMainCard';
import WeatherDetails from '../components/WeatherDetails';
import BackgroundVisual from '../components/BackgroundVisual';
import HourlyForecast from '../components/HourlyForecast';
import WeeklyForecast from '../components/WeeklyForecast';
import LoadingAnimation from '../components/LoadingAnimation';

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
        setError('No se pudo acceder a la geolocalización. Mostrando datos de Buenos Aires.');
        console.error(err);
        handleSearch('Buenos Aires'); // Cargar ciudad por defecto
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
    <div className="relative min-h-screen bg-black text-white">
      <AnimatePresence>
        {loading && <LoadingAnimation />}
      </AnimatePresence>

      <BackgroundVisual weather={weather} />
      <main className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] h-screen p-8 gap-8">
        {/* Columna Izquierda */}
        <motion.section
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col justify-between"
        >
          <WeatherHeader onSearch={handleSearch} />
          <WeatherDetails weather={weather} />
        </motion.section>

        {/* Columna Central */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center text-center"
        >
          <WeatherMainCard weather={weather} />
          <HourlyForecast forecast={forecast} />
        </motion.section>

        {/* Columna Derecha: Pronóstico Semanal */}
        <motion.section
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-end"
        >
          <WeeklyForecast forecast={forecast} />
        </motion.section>
      </main>
    </div>
  );
}
