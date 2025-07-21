import { ForecastData } from '../types';

interface HourlyForecastProps {
  forecast: ForecastData | null;
}

export default function HourlyForecast({ forecast }: HourlyForecastProps) {
  if (!forecast) return null;

  // Tomamos las próximas 8 lecturas (24 horas)
  const hourlyData = forecast.list.slice(0, 8);

  return (
    <div className="w-full mt-8">
      <h3 className="mb-4 text-lg font-semibold text-center">Pronóstico por Hora</h3>
      <div className="flex justify-between p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
        {hourlyData.map((hour, index) => (
          <div key={index} className="flex flex-col items-center">
            <span>{new Date(hour.dt * 1000).getHours()}:00</span>
            <span className="font-bold text-lg">{Math.round(hour.main.temp)}°</span>
          </div>
        ))}
      </div>
    </div>
  );
}
