import { motion } from 'framer-motion';
import React from 'react';

interface WeatherIconProps {
  iconCode: string;
}

const sunny = (
  <motion.svg
    animate={{ rotate: 360 }}
    transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
    width="100" height="100" viewBox="0 0 100 100"
  >
    <circle cx="50" cy="50" r="20" fill="yellow" />
  </motion.svg>
);

const cloudy = (
  <motion.svg width="100" height="100" viewBox="0 0 100 100">
    <motion.path
      d="M 20 60 C 10 60, 10 50, 20 50 L 80 50 C 90 50, 90 60, 80 60 Z"
      fill="white"
      animate={{ x: [0, 5, 0] }}
      transition={{ repeat: Infinity, duration: 3 }}
    />
  </motion.svg>
);

// Añadiremos más iconos para lluvia, nieve, etc.

const icons: { [key: string]: React.ReactNode } = {
  '01d': sunny,
  '01n': sunny, // Noche despejada también soleado por ahora
  '02d': cloudy,
  '02n': cloudy,
  '03d': cloudy,
  '03n': cloudy,
  '04d': cloudy,
  '04n': cloudy,
};

export default function WeatherIcon({ iconCode }: WeatherIconProps) {
  const icon = icons[iconCode] || sunny; // Icono por defecto
  return <div>{icon}</div>;
} 