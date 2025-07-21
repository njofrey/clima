import { WeatherData } from '../types';
import WeatherIcon from './WeatherIcon';

interface CurrentWeatherProps {
  data: WeatherData;
}

export default function CurrentWeather({ data }: CurrentWeatherProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg text-center">
      <h2 className="text-3xl font-bold">{data.name}</h2>
      <p className="text-xl capitalize">{data.weather[0].description}</p>
      <div className="flex justify-center items-center my-4">
        <span className="text-6xl font-bold">{Math.round(data.main.temp)}°C</span>
        <WeatherIcon iconCode={data.weather[0].icon} />
      </div>
      <div className="flex justify-around">
        <p>Sensación: {Math.round(data.main.feels_like)}°C</p>
        <p>Humedad: {data.main.humidity}%</p>
      </div>
    </div>
  );
} 