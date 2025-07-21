import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const API_KEY = process.env.OPENWEATHER_API_KEY;
const API_URL = 'https://api.openweathermap.org/data/2.5';

export async function GET(request: Request) {
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

  try {
    const res = await fetch(url);
    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json({ error: 'Failed to fetch weather data', details: errorData }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 