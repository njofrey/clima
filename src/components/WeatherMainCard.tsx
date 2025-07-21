import { WeatherData } from '../types';

interface WeatherMainCardProps {
  weather: WeatherData | null;
}

export default function WeatherMainCard({ weather }: WeatherMainCardProps) {
  if (!weather) {
    return (
      <div className="text-center">
        <h2 className="text-2xl">Busca una ciudad para empezar</h2>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h1 className="text-9xl font-bold">{Math.round(weather.main.temp)}°</h1>
      <p className="text-4xl font-semibold capitalize mt-4">{weather.weather[0].description}</p>
      <p className="text-2xl mt-2">{weather.name}</p>
    </div>
  );
}
