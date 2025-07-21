import { motion } from 'framer-motion';
import { WeatherData } from '../types';

interface BackgroundVisualProps {
  weather: WeatherData | null;
}

const backgrounds: { [key: string]: string } = {
  Clear: 'from-blue-400 to-blue-800',
  Clouds: 'from-gray-500 to-gray-800',
  Rain: 'from-slate-600 to-slate-900',
  Drizzle: 'from-slate-500 to-slate-800',
  Thunderstorm: 'from-indigo-800 to-indigo-900',
  Snow: 'from-white to-gray-300',
  Mist: 'from-gray-300 to-gray-500',
  // Y otros...
};

export default function BackgroundVisual({ weather }: BackgroundVisualProps) {
  const weatherCondition = weather?.weather[0]?.main || 'Clear';
  const gradient = backgrounds[weatherCondition] || backgrounds.Clear;

  return (
    <motion.div
      key={weatherCondition}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={`absolute inset-0 z-0 bg-gradient-to-br ${gradient}`}
    />
  );
}
