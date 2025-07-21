import { ForecastData } from '../types';

interface WeeklyForecastProps {
  forecast: ForecastData | null;
}

export default function WeeklyForecast({ forecast }: WeeklyForecastProps) {
  if (!forecast) return null;

  const dailyData = forecast.list.filter((reading) =>
    reading.dt_txt.includes('12:00:00')
  );

  return (
    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl w-full">
      <h3 className="mb-4 text-lg font-semibold">Pronóstico Semanal</h3>
      <ul className="space-y-2">
        {dailyData.map((day) => (
          <li key={day.dt} className="flex justify-between items-center">
            <span>{new Date(day.dt * 1000).toLocaleDateString('es-ES', { weekday: 'long' })}</span>
            <span className="font-bold">{Math.round(day.main.temp)}°</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
