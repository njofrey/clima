import { NextResponse } from 'next/server';
import { API_KEY, API_URL, ratelimit } from '../utils';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1';
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  const city = searchParams.get('city');

  if ((!lat || !lon) && !city) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  let url = '';
  if (city) {
    // Sanitizamos el input de la ciudad
    const sanitizedCity = encodeURIComponent(city);
    url = `${API_URL}/weather?q=${sanitizedCity}&appid=${API_KEY}&units=metric`;
  } else {
    url = `${API_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  }

  console.log(`Fetching URL: ${url}`); // LOG: Ver la URL que se está llamando

  try {
    const res = await fetch(url);
    if (!res.ok) {
      const errorData = await res.json();
      console.error('Error from OpenWeatherMap API:', errorData); // LOG: Ver el error específico de la API
      return NextResponse.json({ error: `Failed to fetch weather data: ${errorData.message}` }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Fetch failed:', error); // LOG: Ver si el fetch en sí mismo falla
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 