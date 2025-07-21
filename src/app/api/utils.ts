import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

export const API_KEY = process.env.OPENWEATHER_API_KEY;
export const API_URL = 'https://api.openweathermap.org/data/2.5';

// Inicializa el cliente de Redis y el rate limiter
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '10 s'), // 10 peticiones por 10 segundos
  analytics: true,
}); 