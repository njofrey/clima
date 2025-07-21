import { WeatherData, ForecastData } from '../types';

export async function getWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
  const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);

  if (!res.ok) {
    throw new Error('Failed to fetch weather data');
  }

  return res.json();
}

export async function getWeatherByCity(city: string): Promise<WeatherData> {
  const res = await fetch(`/api/weather?city=${city}`);

  if (!res.ok) {
    throw new Error('Failed to fetch weather data');
  }

  return res.json();
}

export async function getForecastByCoords(lat: number, lon: number): Promise<ForecastData> {
  const res = await fetch(`/api/forecast?lat=${lat}&lon=${lon}`);

  if (!res.ok) {
    throw new Error('Failed to fetch forecast data');
  }

  return res.json();
} 