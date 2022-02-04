import React from 'react';
import { useWeather } from './contexts/WeatherContext';

function App() {
  const { weatherData } = useWeather();

  return (
    <>
        {JSON.stringify(weatherData)}
    </>
  );
}

export default App;
