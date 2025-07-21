'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useWeather } from '../hooks/useWeather';
import WeatherHeader from '../components/WeatherHeader';
import WeatherMainCard from '../components/WeatherMainCard';
import WeatherDetails from '../components/WeatherDetails';
import BackgroundVisual from '../components/BackgroundVisual';
import HourlyForecast from '../components/HourlyForecast';
import WeeklyForecast from '../components/WeeklyForecast';
import LoadingAnimation from '../components/LoadingAnimation';

export default function Home() {
  const { weather, forecast, error, loading, handleSearch } = useWeather();

  return (
    <div className="relative min-h-screen bg-black text-white">
      <AnimatePresence>
        {loading && <LoadingAnimation />}
      </AnimatePresence>

      <BackgroundVisual weather={weather} />

      <main className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] h-screen p-8 gap-8">
        {error && (
          <div className="col-span-full text-center text-red-500 bg-black/50 p-4 rounded-lg">
            <p>Error: {error}</p>
          </div>
        )}
        
        {!loading && !error && (
          <>
            <motion.section
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col justify-between"
            >
              <WeatherHeader onSearch={handleSearch} />
              <WeatherDetails weather={weather} />
            </motion.section>

            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center justify-center text-center"
            >
              <WeatherMainCard weather={weather} />
              <HourlyForecast forecast={forecast} />
            </motion.section>

            <motion.section
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-end"
            >
              <WeeklyForecast forecast={forecast} />
            </motion.section>
          </>
        )}
      </main>
    </div>
  );
}
