'use client';

import { ForecastData } from '../types';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface HourlyForecastProps {
  forecast: ForecastData | null;
}

export default function HourlyForecast({ forecast }: HourlyForecastProps) {
  if (!forecast) return null;

  const hourlyData = forecast.list.slice(0, 8).map(hour => ({
    time: new Date(hour.dt * 1000).getHours() + ':00',
    temp: Math.round(hour.main.temp),
  }));

  return (
    <div className="w-full mt-8 bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
      <h3 className="mb-4 text-lg font-semibold text-center">Pronóstico por Hora</h3>
      <ResponsiveContainer width="100%" height={150}>
        <AreaChart data={hourlyData}>
          <defs>
            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="time" stroke="white" />
          <YAxis stroke="white" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              border: 'none',
              color: 'white'
            }}
          />
          <Area type="monotone" dataKey="temp" stroke="#8884d8" fillOpacity={1} fill="url(#colorTemp)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
