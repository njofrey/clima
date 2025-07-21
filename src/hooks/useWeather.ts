'use client';

import { useState, useEffect } from 'react';
import { WeatherData, ForecastData } from '../types';

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchWeatherAndForecast(lat: number, lon: number) {
    setLoading(true);
    setError(null);
    try {
      const weatherRes = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
      const forecastRes = await fetch(`/api/forecast?lat=${lat}&lon=${lon}`);

      if (!weatherRes.ok) {
        const errorData = await weatherRes.json();
        throw new Error(errorData.error || 'Failed to fetch weather data');
      }
      if (!forecastRes.ok) {
        const errorData = await forecastRes.json();
        throw new Error(errorData.error || 'Failed to fetch forecast data');
      }

      const weatherData = await weatherRes.json();
      const forecastData = await forecastRes.json();

      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err: any) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(city: string) {
    setLoading(true);
    setError(null);
    try {
      const weatherRes = await fetch(`/api/weather?city=${city}`);
      if (!weatherRes.ok) {
        const errorData = await weatherRes.json();
        throw new Error(errorData.error || 'City not found');
      }
      
      const weatherData = await weatherRes.json();
      setWeather(weatherData);

      if (weatherData) {
        const { lat, lon } = weatherData.coord;
        const forecastRes = await fetch(`/api/forecast?lat=${lat}&lon=${lon}`);
        if (!forecastRes.ok) {
          const errorData = await forecastRes.json();
          throw new Error(errorData.error || 'Failed to fetch forecast');
        }
        
        const forecastData = await forecastRes.json();
        setForecast(forecastData);
      }
    } catch (err: any) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeatherAndForecast(position.coords.latitude, position.coords.longitude);
      },
      (err) => {
        setError('No se pudo acceder a la geolocalización. Mostrando datos de Buenos Aires.');
        console.error(err);
        handleSearch('Buenos Aires');
      }
    );
  }, []);

  return { weather, forecast, error, loading, handleSearch };
} 