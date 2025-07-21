import { ForecastData } from '../types';
import WeatherIcon from './WeatherIcon';

interface ForecastProps {
  data: ForecastData;
}

export default function Forecast({ data }: ForecastProps) {
  const dailyData = data.list.filter((reading) =>
    reading.dt_txt.includes('12:00:00')
  );

  return (
    <div className="mt-6">
      <h3 className="text-2xl font-bold mb-4 text-center">Pronóstico 5 días</h3>
      <div className="flex justify-between">
        {dailyData.map((day) => (
          <div key={day.dt} className="flex flex-col items-center bg-gray-800 p-2 rounded-lg">
            <p>{new Date(day.dt * 1000).toLocaleDateString('es-ES', { weekday: 'short' })}</p>
            <WeatherIcon iconCode={day.weather[0].icon} />
            <p className="font-bold">{Math.round(day.main.temp)}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
} 