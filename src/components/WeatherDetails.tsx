import { WeatherData } from '../types';

interface WeatherDetailsProps {
  weather: WeatherData | null;
}

export default function WeatherDetails({ weather }: WeatherDetailsProps) {
  if (!weather) return null;

  const details = [
    { label: 'Sensación Térmica', value: `${Math.round(weather.main.feels_like)}°` },
    { label: 'Humedad', value: `${weather.main.humidity}%` },
    { label: 'Viento', value: `${weather.wind.speed.toFixed(1)} km/h` },
    { label: 'Presión', value: `${weather.main.pressure} hPa` },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
      <h3 className="mb-4 text-lg font-semibold">Detalles del Clima</h3>
      <ul className="space-y-2">
        {details.map((item) => (
          <li key={item.label} className="flex justify-between">
            <span>{item.label}</span>
            <span className="font-bold">{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
